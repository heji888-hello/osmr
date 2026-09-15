const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// NOTE: Volatile in-memory store. Will reset on server restart.
let uploadedTracks = [];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.mp3', '.wav', '.zip', '.m4a'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type! Only .mp3, .wav, .zip, and .m4a are allowed.'));
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } 
}).single('project_file'); // Wrapped neatly here

app.get('/api/tracks', (req, res) => {
    res.json(uploadedTracks);
});

app.post('/upload', (req, res) => {
    upload(req, res, function (err) {
        // Theme-matched styling helper function
        const renderResponsePage = (title, message, linkText, linkUrl, isError) => `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${title}</title>
                <style>
                    body { background-color: #171315; color: #f1ebd9; font-family: sans-serif; text-align: center; padding-top: 80px; }
                    .box { background-color: rgba(22, 18, 24, 0.85); border: 2px solid #443b52; border-top: 4px solid ${isError ? '#e74c3c' : '#ff66aa'}; padding: 40px; max-width: 500px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                    h2 { color: ${isError ? '#e74c3c' : '#ffffff'}; margin-top: 0; }
                    a { display: inline-block; background-color: #ff66aa; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; margin-top: 20px; transition: transform 0.1s; }
                    a:hover { background-color: #ff85bc; }
                </style>
            </head>
            <body>
                <div class="box">
                    <h2>${title}</h2>
                    <p>${message}</p>
                    <a href="${linkUrl}">${linkText}</a>
                </div>
            </body>
            </html>
        `;

        if (err) {
            return res.status(400).send(renderResponsePage(
                'Upload Rejected', 
                `Reason: <strong>${err.message}</strong><br><br><span style="color:#bfa7de; font-size:0.85rem;">Note: Max size is 100MB. Audio tracks and zipped projects only.</span>`, 
                '← Go Back & Try Again', 
                '/Upload.html', 
                true
            ));
        }

        // FIX: Safe to check parameters now that Multer has parsed the request context
        if (!req.file) {
            return res.status(400).send(renderResponsePage('Upload Error', 'Please select an audio file or zip project to upload.', '← Go Back', '/Upload.html', true));
        }
        if (!req.body.track_title || !req.body.genre) {
            return res.status(400).send(renderResponsePage('Missing Information', 'Track title and genre fields are required.', '← Go Back', '/Upload.html', true));
        }

        const newTrack = {
            id: Date.now(),
            title: req.body.track_title,
            genre: req.body.genre,
            bpm: req.body.bpm || 'N/A',
            daw: req.body.daw_type,
            note: req.body.feedback_note || 'No notes provided.',
            filename: req.file.filename,
            comments: [] 
        };

        uploadedTracks.unshift(newTrack);

        res.send(renderResponsePage(
            'Upload Successful', 
            `Your track <strong>"${req.body.track_title}"</strong> has been submitted to the community feed.`, 
            'Go to Home Feed →', 
            '/Home.html', 
            false
        ));
    });
});

app.post('/api/feedback', (req, res) => {
    const { trackId, reviewerName, feedbackText } = req.body;

    if (!reviewerName || !feedbackText) {
        return res.status(400).json({ error: 'Missing name or feedback content.' });
    }
    
    const track = uploadedTracks.find(t => t.id == trackId);

    if (!track) {
        return res.status(404).json({ error: 'Track not found.' });
    }

    const newComment = {
        id: Date.now(),
        author: reviewerName,
        text: feedbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    track.comments.push(newComment); 
    res.json({ success: true, comments: track.comments });
});

app.listen(3000, () => {
    console.log('Server is running perfectly!');
    console.log('Open your browser and go to: http://localhost:3000/osmr!.html');
});
