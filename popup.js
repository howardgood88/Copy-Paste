function saveToStorage(value){
	chrome.storage.sync.set({table: value}, function() {
		console.log('Value is set to ' + value);
	});
}

function loadFromStorage(){
	//add listener to delete button
	function addListenerTo_button_delrow(matches){
		var matches_td = matches.querySelectorAll('[id="delrow"]');
		matches_td.forEach(function(val){
			val.addEventListener('click', (e) => {
				var row_num = e.target.parentNode.parentNode.rowIndex;
				var table = document.getElementById("table");
				table.deleteRow(row_num);
				saveToStorage(document.getElementById("table").innerHTML);
			});
		})
	}

	//add listener to copy button
	function addListenerTo_button_copytext(matches){
		var matches_td = matches.querySelectorAll('[id="copytext"]');
		matches_td.forEach(function(val){
			val.addEventListener('click', (e) => {
				var row_num = e.target.parentNode.parentNode.rowIndex;
				var matches_p = matches.querySelectorAll('[id="text"]')[row_num-1];
				matches_p.select();
				document.execCommand("Copy");
			});
		})
	}

	chrome.storage.sync.get(['table'], function(result){
		var result = result.table;
		var table = document.getElementById("table");
		table.innerHTML = result;

		//add listener to button copytext and delrow
		var matches = document.querySelector("tbody");
		addListenerTo_button_delrow(matches);
		addListenerTo_button_copytext(matches);
	});
}

loadFromStorage();	//load old table from storage and add listener

document.getElementById('additem').addEventListener('click', () => {
	var string = document.getElementById("string").value;
	var name = document.getElementById("name").value;
	if (string == ''){
		return;			//detect null string
	}
	else{
		document.getElementById("string").value = '';
		document.getElementById("name").value = '';
	}

	//insert new row to table
	var table = document.getElementById("table").insertRow(-1);
	var col0 = table.insertCell(0);
	var col1 = table.insertCell(1);
	var col2 = table.insertCell(2);
	var col3 = table.insertCell(3);
	col0.innerHTML = '<textarea>'+name+'</textarea>';
	col1.innerHTML = '<textarea id="text">'+string+'</textarea>';
	col2.innerHTML = '<button id="copytext">複製</button>';
	col3.innerHTML = '<button id="delrow">刪除</button>';

	//save table to storage (mainly for add listenser to button)
	saveToStorage(document.getElementById("table").innerHTML);
	loadFromStorage();
});