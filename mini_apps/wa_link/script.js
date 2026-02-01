function generate() {
    const phone = document.getElementById('phone').value.replace(/\D/g, '');
    const msg = encodeURIComponent(document.getElementById('msg').value);
    const box = document.getElementById('result-box');
    
    if (phone.length > 5) {
        const url = `https://wa.me/${phone}?text=${msg}`;
        document.getElementById('final-link').value = url;
        document.getElementById('preview-btn').href = url;
        box.style.display = 'block';
    } else {
        box.style.display = 'none';
    }
}

function copyLink() {
    const copyText = document.getElementById("final-link");
    copyText.select();
    document.execCommand("copy");
    alert("Copied!");
}