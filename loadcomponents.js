//function to load a componenet from a given path
function loadComponent(elementID, filepath) {
    //fetch the html content from the provided file path
    fetch(filepath)
        .then(response =>{
            if (!response.ok) {
                throw new Error(failed to load ${filepath}: ${response.status});
            }
            return response.text();
        })
        .then(data =>{
            document.getElementById(elementID).innerHTML = data;
})
.catch(error => console.error('Error loading component:', error));
}

window.onload = function() {
    loadComponent('side-nav', '/workspace/Web504A-Playground/side-nav.html');
    loadComponent('header', '/workspace/Web504A-Playground/header.html');
    loadComponent('footer', '/workspace/Web504A-Playground/footer.html');
};
