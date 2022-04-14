const main = document.querySelector('.main');
const calories = document.querySelector('.calories');
const foodplan = document.querySelector('.foodplan');
const bodyfat = document.querySelector('.bodyfat');



function init() {
	calories.style.display = 'none';
	bodyfat.style.display = 'none';
	foodplan.style.display = 'none';
	radio_button();
}

function show_option(option){
	if (option == 1) {
		calories.style.display = 'block';
		bodyfat.style.display = 'none';
		foodplan.style.display = 'none';
		calories.scrollIntoView();
	}
	else if(option == 2){
		calories.style.display = 'none';
		bodyfat.style.display = 'block';
		foodplan.style.display = 'none';
		bodyfat.scrollIntoView();
	}
	else if(option == 3){
		calories.style.display = 'none';
		bodyfat.style.display = 'none';
		foodplan.style.display = 'block';
		foodplan.scrollIntoView();
	}
	
}

function onlynum(id_input) {
    var ip = document.getElementById(id_input);
    var res = ip.value;

    if (res != '') {
        if (isNaN(res)) {
              
            // Set input value empty
            ip.value = "";
              
            // Reset the form
            ip.reset();
            return false;
        } else {
            return true
        }
    }
}

function radio_button(){
	var gender = document.getElementsByName('gender');
	var female_label =document.getElementById('female_label');
	var male_label =document.getElementById('male_label');
	var result = document.getElementById('result_calories');
	var selector_calories = document.getElementById('selector_calories');
	var calories_btn = document.getElementById('calories_btn');
	var calories_title = document.getElementById('calories_title');

	for(i = 0; i < gender.length; i++) {
        if(gender[i].checked){
        	if(gender[i].value=="male"){
        		calories_btn.style.backgroundColor = "#145369";
        		selector_calories.style.color = "#145369";
        		calories_title.style.color = "#145369";
        		female_label.style.color = "#145369";
        		male_label.style.color = "#145369";
        		result.style.color = "#145369";

	        }
	        else if (gender[i].value=="female"){
	        	calories_btn.style.backgroundColor = "#fc9483";
	        	selector_calories.style.color = "#fc9483";
	        	calories_title.style.color = "#fc9483";
	        	female_label.style.color = "#fc9483";
        		male_label.style.color = "#fc9483";
	        	result.style.color = "#fc9483";
	        }	     	
        }
        
        
    }
}
function status_input_calories(status){
	document.getElementById("female").disabled = status;
	document.getElementById("male").disabled = status;
	document.getElementById("age").disabled = status;
	document.getElementById("weight").disabled = status;
	document.getElementById("height").disabled = status;
	document.getElementById("exercise").disabled = status;
}
function empty_check(){
	if (document.getElementById('age').value == "" || document.getElementById('age').value <= 0) {
		alert("age cannot be empty or 0. please check again !");
		return false;
	}
	else if (document.getElementById('weight').value == "" || document.getElementById('weight').value <= 0) {
		alert("weight cannot be empty or 0. please check again !");
		return false;
	}
	else if (document.getElementById('height').value == "" || document.getElementById('height').value <= 0) {
		alert("height cannot be empty or 0. please check again !");
		return false;
	}
	else if (document.getElementById('exercise').value == "") {
		alert("exercise cannot be empty or 0. please check again !");
		return false;
	}
	else{
		return true;
	}

}
function check_input(){
	var calories_btn = document.getElementById('calories_btn');
	if (calories_btn.innerHTML == "count" && empty_check() == true){
		status_input_calories(true);
		calories_btn.innerHTML = "edit";
    	count_calories();
    	var result = document.getElementById('result_calories');
    	result.scrollIntoView();

	}
	else if (calories_btn.innerHTML == "edit"){
		status_input_calories(false);
    	document.getElementById('result_calories').innerHTML = "Result";
    	
    	calories_btn.innerHTML = "count";
    }
    else{
    	empty_check();
    }
	
}

function count_calories(){
	var gender = document.getElementsByName('gender');

	var bmr = 0;
	var total = 0;
	var bmi = 0;

	var age = document.getElementById('age').value;
	var weight = document.getElementById('weight').value;
	var height = document.getElementById('height').value;
	var exercise = document.getElementById('exercise').value;

	var get_exercise = set_exercise(exercise);

	for(i = 0; i < gender.length; i++) {
        if(gender[i].checked){
        	if(gender[i].value=="male"){
        		bmr = (88.4 + 13.4 * weight) + (4.8 * height) - (5.68 * age);
	        }
	        else if (gender[i].value=="female"){
	        	bmr = (447.6 + 9.25 * weight) + (3.1 * height) - (4.33 * age);
	        }
	        bmi = weight / (Math.pow((height/100),2));
	        show_result(bmr,get_exercise,bmi);
        }
        
    }
}

function show_result(bmr,get_exercise,bmi){
	var result = document.getElementById('result_calories');
	total = bmr * get_exercise;
	var bmi_text = "BMI : "+bmi.toFixed(2)+level_bmi(bmi)+"<br>";
	var bmr_text = "BMR : "+comma_number(bmr)+" kkal <br>";
	var calories_text = "Calories / Day : "+comma_number(total)+" kkal<br>";
	var carbo_text = "Carbo : "+((total*60/100)/4).toFixed(0)+" g ("+comma_number((total*60/100).toFixed(0))+" kkal)<br>";
	var protein_text = "Protein : "+((total*15/100)/4).toFixed(0)+" g ("+comma_number((total*15/100).toFixed(0))+" kkal)<br>";
	var fat_text = "Fat : "+((total*15/100)/9).toFixed(0)+" g ("+comma_number((total*15/100).toFixed(0))+" kkal)<br>";

	result.innerHTML = bmi_text+bmr_text+calories_text+carbo_text+protein_text+fat_text;
}

function level_bmi(bmi){
	if (bmi <= 18.5) {
		return " (underweight)";
	}
	else if (bmi > 18.5 && bmi <= 24.9) {
		return " (normal)";
	}
	else if (bmi >= 25 && bmi <= 29.9){
		return " (pre-obesity)"
	}
	else if (bmi >= 30 && bmi <= 34.9){
		return " (obesity class 1)"
	}
	else if (bmi >= 35 && bmi <= 39.9){
		return " (obesity class 2)"
	}
	else if (bmi >= 40){
		return " (obesity class 3)"
	}
}

function set_exercise(x) {
	if (x == 0) {
		return 1.2;
	}
	else if (x == 1){
		return 1.25;
	}
	else if (x == 2){
		return 1.35;
	}
	else if (x == 3){
		return 1.45;
	}
	else if (x == 4){
		return 1.5;
	}
	else if (x == 5){
		return 1.55;
	}
	else if (x == 6){
		return 1.7;
	}
	else if (x == 7){
		return 1.8;
	}
}

function comma_number(num) {
	var x = Math.trunc(num)
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}


init();