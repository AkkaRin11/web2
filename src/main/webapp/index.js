let clickListener = null
let canvas = null
let ctx = null
let lastR = null

function drawCanvas(r) {
    lastR = r
    canvas = document.getElementById('graphCanvas')
    ctx = canvas.getContext('2d')

    const width = canvas.width
    const height = canvas.height
    const centerX = width/2
    const centerY = height/2
    const scale = (width/2-40)/r

    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = 'rgba(0, 0, 255, 0.3)'

    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX+(r/2)*scale, centerY)
    ctx.lineTo(centerX, centerY-(r/2)*scale)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, r*scale, Math.PI/2, Math.PI, false)
    ctx.closePath()
    ctx.fill()

    ctx.fillRect(centerX, centerY, -r*scale, -r*scale)

    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, height)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(width-10, centerY-5)
    ctx.lineTo(width, centerY)
    ctx.lineTo(width-10, centerY+5)
    ctx.moveTo(centerX-5, 10)
    ctx.lineTo(centerX, 0)
    ctx.lineTo(centerX+5, 10)
    ctx.stroke()

    ctx.fillStyle = 'black'
    ctx.font = '12px Arial'

    ctx.fillText('X', width-15, centerY-10)
    ctx.fillText(`-\${r}`, centerX-r*scale-10, centerY+15)
    ctx.fillText(`-\${r/2}`, centerX-(r/2)*scale-15, centerY+15)
    ctx.fillText(`\${r/2}`, centerX+(r/2)*scale-5, centerY+15)
    ctx.fillText(`\${r}`, centerX+r*scale-5, centerY+15)

    ctx.fillText('Y', centerX+10, 15)
    ctx.fillText(`\${r}`, centerX+5, centerY-r*scale+5)
    ctx.fillText(`\${r/2}`, centerX+5, centerY-(r/2)*scale+5)
    ctx.fillText(`\${-r/2}`, centerX+5, centerY+(r/2)*scale+5)
    ctx.fillText(`-\${r}`, centerX+5, centerY+r*scale+5)

    ctx.beginPath()
    ctx.moveTo(centerX-r*scale, centerY-5)
    ctx.lineTo(centerX-r*scale, centerY+5)
    ctx.moveTo(centerX-(r/2)*scale, centerY-5)
    ctx.lineTo(centerX-(r/2)*scale, centerY+5)
    ctx.moveTo(centerX+(r/2)*scale, centerY-5)
    ctx.lineTo(centerX+(r/2)*scale, centerY+5)
    ctx.moveTo(centerX+r*scale, centerY-5)
    ctx.lineTo(centerX+r*scale, centerY+5)

    ctx.moveTo(centerX-5, centerY-r*scale)
    ctx.lineTo(centerX+5, centerY-r*scale)
    ctx.moveTo(centerX-5, centerY-(r/2)*scale)
    ctx.lineTo(centerX+5, centerY-(r/2)*scale)
    ctx.moveTo(centerX-5, centerY+(r/2)*scale)
    ctx.lineTo(centerX+5, centerY+(r/2)*scale)
    ctx.moveTo(centerX-5, centerY+r*scale)
    ctx.lineTo(centerX+5, centerY+r*scale)

    ctx.stroke();

    if (clickListener) {
        canvas.removeEventListener('click', clickListener)
    }

    clickListener = function (event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        const relativeX = (x - centerX) / scale
        const relativeY = (centerY - y) / scale

        sendData(relativeX.toFixed(3), relativeY.toFixed(3), r)
    };

    canvas.addEventListener('click', clickListener);
}
function drawPoint(color, r, relativeX, relativeY){
    const width = canvas.width
    const height = canvas.height
    const centerX = width/2
    const centerY = height/2
    const scale = (width/2-40)/r

    ctx.fillStyle = color;
    const px = centerX + relativeX * scale
    const py = centerY - relativeY * scale
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fill()
}

function getCheckedCheckBoxes() {
    let flag = true

    let checkboxes = document.getElementsByClassName('checkbox')
    let checkboxesChecked = []
    for (let index = 0; index < checkboxes.length; index++) {
        if (checkboxes[index].checked) {
            checkboxesChecked.push(checkboxes[index].value)
        }
    }

    if (checkboxesChecked.length > 1 || checkboxesChecked.length == 0){
        flag = false;
    }

    let text = document.getElementById('y-value').value

    if(!(/^-?\d+([,.]\d+)?$/.test(text))){
        flag = false
    }

    const options = document.getElementsByName('r-value')

    let selectedValue;

    for (const option of options) {
        if (option.checked) {
            selectedValue = option.value
            break;
        }
    }
    if (!selectedValue) {
        flag = false
    }

    if(flag){
        document.getElementById('checkButton').classList.remove('highlight')
        if(lastR == null || lastR !== selectedValue){
            drawCanvas(selectedValue)
        }
        sendData(checkboxesChecked[0], text, selectedValue)
    } else {
        document.getElementById('checkButton').classList.add('highlight')
    }
}

function sendData(x, y, r){
    const formData = new FormData()

    formData.append('y', y)
    formData.append('x', x)
    formData.append('r', r)

    fetch('http://localhost:8080/table', { //вот тут запрос к другому сервлету
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status}`)
            }
            return response.text()
        })
        .then(function (answer) {
            document.getElementById('dynamicContent').innerHTML = answer

            let table = document.getElementById("resultTable")
            const lastRow = table.rows[table.rows.length - 1]
            const isHit = lastRow.cells[0].innerText

            if (isHit === "true"){
                drawPoint("green", r, x, y)
            } else {
                drawPoint("red", r, x, y)
            }

        })
}