function linear (move: (position: number) => void) {
    let lastTime = 0; 
    let passed = 0;

    function animate (time: DOMHighResTimeStamp) {
        const delta = lastTime ? (time - lastTime) / 1000 : 0;
        lastTime = time;
        passed += delta;
    
        move((passed / 3) - 1);
    
        if (passed < 3) {
            requestAnimationFrame(animate)
        }
    }

    requestAnimationFrame(animate)
}