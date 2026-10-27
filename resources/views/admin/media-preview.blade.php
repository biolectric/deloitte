<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title }}</title>
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0b0b0b;
            color: #fff;
            font-family: system-ui, sans-serif;
        }
        video, audio {
            width: min(960px, 92vw);
            max-height: 90vh;
        }
        audio {
            width: min(480px, 92vw);
        }
    </style>
</head>
<body>
@if ($mediaType === 'video')
    <video src="{{ $src }}" controls autoplay playsinline></video>
@elseif ($mediaType === 'audio')
    <audio src="{{ $src }}" controls autoplay></audio>
@else
    <p>This file type cannot be previewed.</p>
@endif
</body>
</html>
