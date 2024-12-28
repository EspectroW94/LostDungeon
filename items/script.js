const glosarioList = document.getElementById('glosario');

Papa.parse('items.csv', {
  download: true,
  header: true, 
  skipEmptyLines: true, // Ignorar líneas vacías
  complete: (results) => {
    const items = results.data;
	  
	  // Ordenar los items por el campo "Name" antes de crear los elementos HTML
        items.sort((a, b) => a.Name.localeCompare(b.Name));

    items.forEach(item => {
	
      const listItem = document.createElement('li');
      listItem.classList.add('item-entry');

      const itemImage = document.createElement('img');
      itemImage.classList.add('item-image');
      
      if (item.Icon) {
      // Expresión regular para encontrar palabras separadas por guiones bajos
      const regex = /_(\w)/g;
      // Capitalizar la primera letra de cada palabra
      const imageName = item.Icon.replace(regex, (match, p1) => p1.toUpperCase());
      itemImage.src = `assets/items/${imageName}`;
      } else {
      console.error("El nombre de la imagen no está definido.");
      }

      const itemName = document.createElement('h3');
      itemName.classList.add('item-name');
      itemName.textContent = item.Name;

      const itemDescription = document.createElement('p');
	  if (item.Description){
      itemDescription.classList.add('item-description');}
      itemDescription.textContent = item.Description;
		
	  if (item.SlotCount>0){
		  itemDescription.textContent = `${item.Description}; ${item.SlotCount} Slots`;
	  }

      listItem.appendChild(itemImage);
      listItem.appendChild(itemName);
      listItem.appendChild(itemDescription);
		
		

		if (item.VitalsGiven!="[0,0]") { 
			const itemVitals = document.createElement('p');
			itemVitals.classList.add('item-vitals');
                
			const vitalsString = item.VitalsGiven;
			const vitalsArray = vitalsString.slice(1, -1).split(',');
			
			itemVitals.innerHTML = `
				<table>
					<tr>
						<td>Vida:</td>
						<td>${vitalsArray[0]}</td>
					</tr>
					<tr>
						<td>Mana:</td>
						<td>${vitalsArray[1]}</td>
					</tr>
				</table>`
			
			
			
			
			
			listItem.appendChild(itemVitals); 
		}
		
		
		// Verificar si hay estadísticas y mostrarlas
            if (item.StatsGiven!="[0,0,0,0,0]") {
                const itemAttributes = document.createElement('p');
                itemAttributes.classList.add('item-attributes');
                
				const statsString = item.StatsGiven;
				const statsArray = statsString.slice(1, -1).split(',');
				
				itemAttributes.innerHTML = `
					<table>
						<tr>
							<td>Ataque:</td>
							<td>${statsArray[0]}</td>
						</tr>
						<tr>
							<td>Habilidad:</td>
							<td>${statsArray[1]}</td>
						</tr>
						<tr>
							<td>Defensa:</td>
							<td>${statsArray[2]}</td>
						</tr>
						<tr>
							<td>Resistencia:</td>
							<td>${statsArray[3]}</td>
						</tr>
						<tr>
							<td>Velocidad:</td>
							<td>${statsArray[4]}</td>
						</tr>
					</table>
					`;
                listItem.appendChild(itemAttributes);
            }
		
      glosarioList.appendChild(listItem);
    });
  }
});