ffmpeg \
  -i input.mp4 \
    -c:v h264 \
    -crf 22 \
    -tune film \
    -profile:v main \
    -level:v 4.0 \
    -maxrate 5000k \
    -bufsize 10000k \
    -r 60 \
    -keyint_min 25 \
    -g 50 \
    -sc_threshold 0 \
    -c:a aac \
    -ar 44100 \
    -b:a 128k \
    -ac 2 \
    -pix_fmt yuv420p \
    -movflags +faststart \
    1080.mp4 \
  -s 1920x1080 -c:v h264 -crf 22 -tune film -profile:v main -level:v 4.0 -maxrate 5000k -bufsize 10000k -r 25 -keyint_min 25 -g 50 -sc_threshold 0 -c:a aac -ar 44100 -b:a 128k -ac 2 -pix_fmt yuv420p -movflags +faststart 1080.mp4 \
  -s 1280x720 -c:v h264 -crf 24 -tune film -profile:v main -level:v 4.0 -maxrate 2500k -bufsize 5000k -r 25 -keyint_min 25 -g 50 -sc_threshold 0 -c:a aac -ar 44100 -b:a 128k -ac 2 -pix_fmt yuv420p -movflags +faststart 720.mp4



# NOTE: use libsvtav1 in prod
ffmpeg -i input.mp4 -s 1280x720 -c:v libaom-av1 -minrate 555k -maxrate 1667k -b:v 1110k -crf 32 -preset 4 -r 24 -g 96 -keyint_min 96 -movflags +faststart -c:a aac -b:a 128k -ac 2 av1-720p.mp4
