document.addEventListener("DOMContentLoaded", function () {
    const satellite1Dropdown = document.getElementById("satellite1");
    const satellite2Dropdown = document.getElementById("satellite2");
    const riskCircle = document.querySelector(".risk-circle");
    const riskValue = document.querySelector(".risk-value");
    const collisionStatus = document.getElementById("collision-status");

    function updateCollisionRisk() {
        const satellite1 = satellite1Dropdown.value;
        const satellite2 = satellite2Dropdown.value;

        // Example risk percentage (replace with actual logic)
        const riskPercentage = Math.floor(Math.random() * 100);

        // Update risk circle and status
        riskValue.textContent = `${riskPercentage}%`;
        riskCircle.className = "risk-circle";
        if (riskPercentage <= 30) {
            riskCircle.classList.add("low-risk");
            collisionStatus.textContent = "Will Collide: Low Risk";
        } else if (riskPercentage <= 60) {
            riskCircle.classList.add("moderate-risk");
            collisionStatus.textContent = "Will Collide: Moderate Risk";
        } else {
            riskCircle.classList.add("high-risk");
            collisionStatus.textContent = "Will Collide: High Risk";
        }
    }

    // Populate dropdowns dynamically
    const satellites = [
        "TIANQI 33", "TIANQI 34", "TIANQI 35", "TIANQI 36", "TJS-12", "CZ-3B R/B", 
        "2024-247B", "HAWK-11B", "2024-247D", "HAWK-11C", "HAWK-11A", "LIZZIESAT-2", 
        "2024-247H", "2024-247J", "2024-247K", "2024-247L", "GITAI-SC1", "2024-247N", 
        "2024-247P", "LASARSAT", "2024-247R", "2024-247S", "CROCUBE", "2024-247U", 
        "2024-247V", "2024-247W", "2024-247X", "2024-247Y", "XCUBE-1", "CTC 0", 
        "DJIBOUTI 1B", "2024-247AC", "2024-247AD", "2024-247AE", "STRIX-2", 
        "ELECTRON KICK STAGE R/B", "STARLINK-11444 [DTC]", "STARLINK-11493 [DTC]", 
        "STARLINK-11453 [DTC]", "STARLINK-11462 [DTC]", "STARLINK-11441 [DTC]", 
        "STARLINK-11445 [DTC]", "STARLINK-11355 [DTC]", "STARLINK-11446 [DTC]", 
        "STARLINK-11428 [DTC]", "STARLINK-11447 [DTC]", "STARLINK-11439 [DTC]", 
        "STARLINK-11434 [DTC]", "STARLINK-11461 [DTC]", "STARLINK-32692", 
        "STARLINK-32680", "STARLINK-32638", "STARLINK-32283", "STARLINK-32676", 
        "STARLINK-32659", "STARLINK-32614", "STARLINK-32418", "RESURS-P 5", "SL-4 R/B", 
        "STARLINK-32702", "STARLINK-32712", "STARLINK-32674", "STARLINK-32711", 
        "STARLINK-32697", "STARLINK-32693", "STARLINK-32721", "STARLINK-32709", 
        "STARLINK-32689", "STARLINK-32724", "STARLINK-32291", "STARLINK-32736", 
        "STARLINK-32737", "STARLINK-32683", "STARLINK-32726", "STARLINK-32730", 
        "STARLINK-32719", "STARLINK-32723", "STARLINK-32722", "STARLINK-32720", 
        "STARLINK-32656", "STARLINK-32690", "2024-252A", "2024-252B", "2024-252C", 
        "2024-252D", "FALCON 9 R/B", "SDX01", "SDX02", "POEM-4", "STARLINK-11518 [DTC]", 
        "STARLINK-11455 [DTC]", "STARLINK-11459 [DTC]", "STARLINK-11178 [DTC]", 
        "STARLINK-11506 [DTC]", "STARLINK-11486 [DTC]", "STARLINK-11511 [DTC]", 
        "STARLINK-11505 [DTC]", "STARLINK-11497 [DTC]", "STARLINK-11477 [DTC]", 
        "STARLINK-11500 [DTC]", "STARLINK-11464 [DTC]", "STARLINK-11502 [DTC]", 
        "STARLINK-32657", "STARLINK-32734", "STARLINK-32733", "STARLINK-32707", 
        "STARLINK-32705", "STARLINK-32743", "STARLINK-32753", "STARLINK-32699", 
        "THURAYA-4", "FALCON 9 R/B", "SHIJIAN-25 (SJ-25)", "CZ-3B R/B", 
        "STARLINK-32713", "STARLINK-32732", "STARLINK-32328", "STARLINK-32332", 
        "STARLINK-32717", "STARLINK-32757", "STARLINK-32731", "STARLINK-32694", 
        "STARLINK-32708", "STARLINK-32718", "STARLINK-32729", "STARLINK-32739", 
        "STARLINK-32714", "STARLINK-32685", "STARLINK-32691", "STARLINK-32788", 
        "STARLINK-32768", "STARLINK-32792", "STARLINK-32725", "STARLINK-32681", 
        "STARLINK-32679", "STARLINK-32749", "STARLINK-32744", "STARLINK-32701", 
        "STARLINK-11452 [DTC]", "STARLINK-11443 [DTC]", "STARLINK-11440 [DTC]", 
        "STARLINK-11514 [DTC]", "STARLINK-11508 [DTC]", "STARLINK-11510 [DTC]", 
        "STARLINK-11512 [DTC]", "STARLINK-11450 [DTC]", "STARLINK-11507 [DTC]", 
        "STARLINK-11482 [DTC]", "STARLINK-11528 [DTC]", "STARLINK-11516 [DTC]", 
        "STARLINK-11527 [DTC]", "STARLINK-32748", "STARLINK-32777", "STARLINK-32741", 
        "STARLINK-32754", "STARLINK-32786", "STARLINK-32789", "STARLINK-32791", 
        "STARLINK-32785", "JIELONG-3 DEB", "CENTISPACE-1 S7", "CENTISPACE-1 S8", 
        "CENTISPACE-1 S9", "CENTISPACE-1 S10", "CENTISPACE-1 S11", "CENTISPACE-1 S12", 
        "CENTISPACE-1 S13", "CENTISPACE-1 S14", "CENTISPACE-1 S15", "CENTISPACE-1 S16", 
        "JIELONG-3 R/B", "2025-010A", "2025-010B", "2025-010C", "2025-010D", "2025-011A"
    ]; 
    [satellite1Dropdown, satellite2Dropdown].forEach(dropdown => {
        satellites.forEach(satellite => {
            const option = document.createElement("option");
            option.value = satellite;
            option.textContent = satellite;
            dropdown.appendChild(option);
        });
    });

    // Add event listeners
    satellite1Dropdown.addEventListener("change", updateCollisionRisk);
    satellite2Dropdown.addEventListener("change", updateCollisionRisk);

    // Initial update
    updateCollisionRisk();
});

    
