
function cargar(){
	const sonidos = document.getElementById('sonido');

document.addEventListener('click',function(evento){
	var song=Math.floor(Math.random() * 6);

	switch(song){
		case 1:
			sonidos.innerHTML= '<audio src="/sounds/Aves.mp3" autoplay></audio></div>';
			break;
			
		case 2:
			sonidos.innerHTML= '<audio src="/sounds/Interior_Casa.mp3" autoplay></audio>';
			break;
			
		case 3:
			sonidos.innerHTML= '<audio src="/sounds/Llamado.mp3" autoplay></audio>';
			break;
			
		case 4:
			sonidos.innerHTML= '<audio src="/sounds/Misa.mp3" autoplay></audio>';
			break;
			
		case 5:
			sonidos.innerHTML= '<audio src="/sounds/Naturaleza.mp3" autoplay></audio>';
			break;
		case 6:
			sonidos.innerHTML= '<audio src="/sounds/Una fiesta en el pueblo.mp3" autoplay></audio>';
	}
		

	
})
}
