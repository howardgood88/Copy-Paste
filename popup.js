function saveToStorage(value){
	chrome.storage.sync.set({table: value}, function() {
		console.log('Value is set to ' + value);
	});
}

function loadFromStorage(){
	function addListenerTo_button_delrow(matches){
		var matches_td = matches.querySelectorAll("[id]");
		matches_td.forEach(function(val){
			val.addEventListener('click', (row) => {
				var row_num = row.target.parentNode.parentNode.rowIndex;
				var table = document.getElementById("table");
				table.deleteRow(row_num);
				saveToStorage(document.getElementById("table").innerHTML);
			});
		})
	}

	function addListenerTo_button_copytext(matches){
		var matches_td = matches.querySelectorAll("[name]");
		matches_td.forEach(function(val){
			val.addEventListener('click', (row) => {
				var row_num = row.target.parentNode.parentNode.rowIndex;
				var matches_p = matches.querySelectorAll("textarea")[row_num-1];
				matches_p.select();
				document.execCommand("Copy");
			});
		})
	}

	chrome.storage.sync.get(['table'], function(result){
		var result = result.table;
		var table = document.getElementById("table");
		table.innerHTML = result;

		var matches = document.querySelector("tbody");
		addListenerTo_button_delrow(matches);
		addListenerTo_button_copytext(matches);
	});
}

loadFromStorage();

document.getElementById('additem').addEventListener('click', () => {
	var string = document.getElementById("string").value;
	if (string == ''){
		return;
	}
	var table = document.getElementById("table").insertRow(-1);
	var col1 = table.insertCell(0);
	var col2 = table.insertCell(1);
	var col3 = table.insertCell(2);
	col1.innerHTML = '<textarea tag="text">'+string+'</textarea>';
	col2.innerHTML = '<button name="copytext">複製</button>';
	col3.innerHTML = '<button id="delrow">刪除</button>';

	saveToStorage(document.getElementById("table").innerHTML);
	loadFromStorage();
});