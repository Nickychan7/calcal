const main = document.querySelector('.main');
const menu = document.querySelector('.menu');
const calories = document.getElementById('calories');
const foodplan = document.getElementById('foodplan');
const bodyfat = document.getElementById('bodyfat');
const div_form = document.querySelector('.div_form');
const calories_form = document.querySelector('.calories_form');
const bodyfat_form_simple = document.querySelector('.bodyfat_form_simple');
const bodyfat_form_specified = document.querySelector('.bodyfat_form_specified');
const simple_selector = document.getElementById('simple_bf_selector');
const specified_selector = document.getElementById('specified_bf_selector');

function init() {
	menu.style.display = 'none';
	calories.style.display = 'none';
	bodyfat.style.display = 'none';
	foodplan.style.display = 'none';
	div_form.style.display = 'none';
	calories_form.style.display = 'none';
	bodyfat_form_simple.style.display = 'none';
	bodyfat_form_specified.style.display = 'none';
}

function refresh_bf(){
	var bf_title = document.getElementById('bodyfat_title');
	bf_title.style.color = '#145369';
	specified_selector.style.backgroundColor = 'transparent';
	specified_selector.style.color = '#145369';
	simple_selector.style.backgroundColor = 'transparent';
	simple_selector.style.color = '#145369';
}

function show_option(option){
	if (option == 1) {
		menu.style.display = 'block';
		calories.style.display = 'block';
		div_form.style.display = 'block';
		calories_form.style.display = 'block';
		bodyfat.style.display = 'none';
		foodplan.style.display = 'none';
		bodyfat_form_simple.style.display = 'none';
		bodyfat_form_specified.style.display = 'none';
		radio_button();
		refresh_bf();
		calories.scrollIntoView();
	}
	else if(option == 2){
		menu.style.display = 'block';
		calories.style.display = 'none';
		div_form.style.display = 'none';
		bodyfat.style.display = 'block';
		calories_form.style.display = 'none';
		foodplan.style.display = 'none';
		bodyfat.scrollIntoView();
	}
	else if(option == 3){
		menu.style.display = 'block';
		div_form.style.display = 'none';
		calories.style.display = 'none';
		bodyfat.style.display = 'none';
		foodplan.style.display = 'block';
		refresh_bf();
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
	var calories_title = document.getElementById('calories');

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
	        bmi = bmi_count(weight,height);
	        show_result(bmr,get_exercise,bmi);
        }
        
    }
}

function bmi_count(weight,height){
	return weight / (Math.pow((height/100),2));
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

function bf_type(num){
	div_form.style.display = 'block';
	check_bf_type();
	if (num == 0) {
		bodyfat_form_simple.style.display = 'block';
		bodyfat_form_specified.style.display = 'none';
		simple_selector.style.backgroundColor = '#145369';
		simple_selector.style.color = '#fff';
		specified_selector.style.backgroundColor = 'transparent';
		specified_selector.style.color = '#145369';
		bodyfat_form_simple.scrollIntoView();
	}
	else if (num == 1) {
		bodyfat_form_simple.style.display = 'none';
		bodyfat_form_specified.style.display = 'block';
		specified_selector.style.backgroundColor = '#145369';
		specified_selector.style.color = '#fff';
		simple_selector.style.backgroundColor = 'transparent';
		simple_selector.style.color = '#145369';
		bodyfat_form_specified.scrollIntoView();
	}
}

function radio_bf_simple(){
	var gender_simple = document.getElementsByName('gender_simple');
	var female_label =document.getElementById('female_label_simple');
	var male_label =document.getElementById('male_label_simple');
	var result_bf_simple = document.getElementById('result_bf_simple');
	var selector_bf_simple = document.getElementById('selector_bf_simple');
	var bf_simple_btn = document.getElementById('bf_simple_btn');
	var bodyfat_title = document.getElementById('bodyfat_title');
	var simple_bf_type = document.getElementById('simple_bf_selector');
	var specified_bf_type = document.getElementById('specified_bf_selector');

	for(i = 0; i < gender_simple.length; i++) {
		if (gender_simple[i].checked) {
			if (gender_simple[i].value=="male") {
				bf_simple_btn.style.backgroundColor = "#145369";
        		selector_bf_simple.style.color = "#145369";
        		bodyfat_title.style.color = "#145369";
        		female_label.style.color = "#145369";
        		male_label.style.color = "#145369";
        		result_bf_simple.style.color = "#145369";	
        		simple_bf_type.style.backgroundColor = "#145369";
        		specified_bf_type.style.color = "#145369";		
        	}
			else if (gender_simple[i].value=="female") {
				bf_simple_btn.style.backgroundColor = "#fc9483";
	        	selector_bf_simple.style.color = "#fc9483";
	        	bodyfat_title.style.color = "#fc9483";
	        	female_label.style.color = "#fc9483";
        		male_label.style.color = "#fc9483";
	        	result_bf_simple.style.color = "#fc9483";
	        	simple_bf_type.style.backgroundColor = "#fc9483";
	        	specified_bf_type.style.color = "#fc9483";
			}
		}
	}
}

function check_bf_type(){
	document.getElementById('male_simple').checked = true;
	document.getElementById('male_specified').checked = true;
	radio_bf_simple();
	radio_bf_specified();
}

function count_bf_simple(){
	var result_bf_simple = document.getElementById('result_bf_simple');
	var gender_simple = document.getElementsByName('gender_simple');
	var age_simple = document.getElementById('age_simple').value;
	var weight_simple = document.getElementById('weight_simple').value;
	var height_simple = document.getElementById('height_simple').value;
	var total = 0;
	var bmi = bmi_count(weight_simple,height_simple);
	for(i = 0; i < gender_simple.length; i++) {
		if (gender_simple[i].checked) {
			if (gender_simple[i].value=="male") {
				total = (1.2 * bmi) + (0.23 * age_simple) - 10.8 - 5.4;
				result_bf_simple.innerHTML = "Your Body Fat is "+comma_number(total)+"%";
			}
			else if (gender_simple[i].value=="female") {
				total = (1.2 * bmi) + (0.23 * age_simple) - 5.4;
				result_bf_simple.innerHTML = "Your Body Fat is "+comma_number(total)+"%";
			}
		}
	}
}

function radio_bf_specified(){
	var gender_specified = document.getElementsByName('gender_specified');
	var female_label =document.getElementById('female_label_specified');
	var male_label =document.getElementById('male_label_specified');
	var result_bf_specified = document.getElementById('result_bf_specified');
	var selector_bf_specified = document.getElementById('selector_bf_specified');
	var bf_specified_btn = document.getElementById('bf_specified_btn');
	var bodyfat_title = document.getElementById('bodyfat_title');
	var simple_bf_type = document.getElementById('simple_bf_selector');
	var specified_bf_type = document.getElementById('specified_bf_selector');

	for(i = 0; i < gender_specified.length; i++) {
		if (gender_specified[i].checked) {
			if (gender_specified[i].value=="male") {
				bf_specified_btn.style.backgroundColor = "#145369";
        		selector_bf_specified.style.color = "#145369";
        		bodyfat_title.style.color = "#145369";
        		female_label.style.color = "#145369";
        		male_label.style.color = "#145369";
        		result_bf_specified.style.color = "#145369";	
        		simple_bf_type.style.color = "#145369";
        		specified_bf_type.style.backgroundColor = "#145369";
        		specified_woman_input(false);
        	}
			else if (gender_specified[i].value=="female") {
				bf_specified_btn.style.backgroundColor = "#fc9483";
	        	selector_bf_specified.style.color = "#fc9483";
	        	bodyfat_title.style.color = "#fc9483";
	        	female_label.style.color = "#fc9483";
        		male_label.style.color = "#fc9483";
	        	result_bf_specified.style.color = "#fc9483";
	        	simple_bf_type.style.color = "#fc9483";
	        	specified_bf_type.style.backgroundColor = "#fc9483";
	        	specified_woman_input(true);
			}
		}
	}

}

function specified_woman_input(status){
	var hip = document.getElementById('hip_specified');
	if (status==true) {
		hip.style.display = 'block';
	}
	else{
		hip.style.display = 'none';
	}
}

function count_bf_specified(){
	var result = document.getElementById('result_bf_specified');
	var bf_specified_btn = document.getElementById('bf_specified_btn');
	var gender_specified = document.getElementsByName('gender_specified');

	var height_specified = document.getElementById('height_specified').value;
	var waist_specified = document.getElementById('waist_specified').value;
	var hip_specified = document.getElementById('hip_specified').value;
	var neck_specified = document.getElementById('neck_specified').value;

	var bf_percent = 0;
	var gender;

	for(i = 0; i < gender_specified.length; i++) {
		if (gender_specified[i].checked) {
			if (gender_specified[i].value == "male") {
				bf_percent = 495 / ( 1.0324 - 0.19077 * Math.log10(waist_specified - neck_specified) + 0.15456 * Math.log10(height_specified) ) - 450;
				console.log("Body fat : "+bf_percent);
			}
			else if (gender_specified[i].value == "female"){
				bf_percent = 0;
			}
			gender = gender_specified[i].value;
		}

	}
	
	result.innerHTML = "Your body fat is "+bf_percent.toFixed(1)+"%<br>"+bf_category(bf_percent,gender);


}

function bf_category(bf_percent,gender){
	if(gender=="male"){
		if (bf_percent<=5.9) {
			return "Category : Essential fat";
		}
		else if (bf_percent<=13.9) {
			return "Category : Athletes";
		}
		else if (bf_percent<=17.9) {
			return "Category : Fitness";
		}
		else if (bf_percent<=24.9) {
			return "Category : Acceptable";
		}
		else if (bf_percent>25) {
			return "Category : Obesity";
		}
	}
	else if (gender=="female") {
		if (bf_percent<=0) {
			return "coming soon";
		}
		else if (bf_percent<=13.9) {
			return "Category : Essential fat";
		}
		else if (bf_percent<=20.9) {
			return "Category : Athletes";
		}
		else if (bf_percent<=24.9) {
			return "Category : Fitness"
		}
		else if (bf_percent<=31.9) {
			return "Category : Acceptable";
		}
		else if (bf_percent>32) {
			return "Category : Obesity";
		}
	}
	
}

function clear_bf(type){
	if (type=="simple") {
		//
	}
	else{
		//
	}
}

init();