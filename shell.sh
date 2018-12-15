echo "Hello shell"

RANDOM=$$
n=$(($RANDOM%2))


#currently, distribute jobs randomly

if [ ${n} -eq 0 ]; then
    scp ./tmp/scene.pbrt slave2@slave2:/home/slave2/pbrt-v3/build
    ssh slave2@slave2 /home/slave2/pbrt-v3/build/render.sh
elif [ ${n} -eq 1 ]; then
    scp ./tmp/scene.pbrt slave1@slave1:/home/slave1/pbrt-v3/build
    ssh slave1@slave1 /home/slave1/pbrt-v3/build/render.sh
fi

