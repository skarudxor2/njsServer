echo "Hello shell"

sshpass -p 'ska135' scp ./tmp/test.pbrt slave2@slave2:/home/slave2/pbrt-v3/build
ssh slave2@slave2 /home/slave2/pbrt-v3/build/render.sh
