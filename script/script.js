const file = document.querySelector('input'),
download = document.querySelector('button')

download.addEventListener('click', event => {
    event.preventDefault() // preventing form from submitting
    download.innerHTML = 'Baixando o arquivo...'
    fetchFile(file.value)
})

function fetchFile(url) {
    // Fetching file & returning response as blob
    fetch(url).then(res => res.blob()).then(file => {
        let tempURL = URL.createObjectURL(file)
        let link = document.createElement('a')
        link.href = tempURL // Passing tempURL as href value of <a> tag
        // Passing file last name & extension as download value of <a> tag
        link.download = url.replace(/^.*[\\\/]/, '')
        document.body.appendChild(link) // Adding <a> tag inside body
        link.click() // Clicking <a> tag so the file download
        link.remove() // Removing <a> tag once file downloaded
        URL.revokeObjectURL(tempURL) // Removing tempURL from the document
        download.innerHTML = 'Baixar Arquivo'
    }).catch(() => {
        // Catch method will call if any error comes during downloading
        download.innerHTML = 'Baixar Arquivo'
        alert('Falha ao Baixar Arquivo')
    })
}