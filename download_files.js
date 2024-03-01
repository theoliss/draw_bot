// Fonction pour télécharger le contenu d'un bloc de texte dans un fichier .txt
function downloadText(content, filename) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Écouteurs d'événements pour les boutons de téléchargement
document.getElementById('downloadDraw').addEventListener('click', function() {
    const drawContent = document.getElementById('draw').innerText;
    downloadText(drawContent, 'draw.txt');
});

document.getElementById('downloadConfigs').addEventListener('click', function() {
    const configsContent = document.getElementById('configs').innerText;
    downloadText(configsContent, 'configs.txt');
});