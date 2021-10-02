//app.js
//NW Bootcamp - Project 3 CA Home Value Prediction Using ML

// AWS API Gateway Url for AWS Lambda Function
var awsApiGatewayUrl = "https://m0rnqlct08.execute-api.us-east-2.amazonaws.com/prod/predict-home-value-function"

function GetJIMPestimateValue(event){

	//Get the input for the predictor model
	var housingAge = d3.select("#txtHousingAge").property('value');
	var roomsPerHousehold = d3.select("#txtRoomsPerHouseHold").property('value');
	var oceanProximity = d3.select("#selectOceanProximity").property('value');
	var houseAgeSq = parseInt(housingAge) * parseInt(housingAge);

	var medianIncome = 0;
	if (oceanProximity == 1){
		medianIncome = 3.208996382;
	} else if (oceanProximity == 2) {
		medianIncome = 2.74442		;
	} else if (oceanProximity == 3) {
		medianIncome = 4.17288476;
	} else if (oceanProximity == 4) {
		medianIncome = 4.005784801;
	} else {
		medianIncome = 4.230681918;
	}

	//Prepare the JSON for AWS API gateway post method input model parameter
	var data = {
		"housing_age": parseInt(housingAge),
		"rooms_per_household": parseInt(roomsPerHousehold),
		"median_income": medianIncome,
		"inland": oceanProximity == 1 ? 1 : 0,
		"island": oceanProximity == 2 ? 1 : 0,
		"near_bay": oceanProximity == 3 ? 1 : 0,
		"near_ocean": oceanProximity == 4 ? 1 : 0,
		"less_than_1_hr": oceanProximity == 5 ? 1 : 0,
		"housing_age_sq_ft": houseAgeSq
	  }

	  console.log(JSON.stringify(data));
	  // Call the AWS lambda function using AWS API Gateway POST method url with input model parameter
	  // and display the predicted value returned by AWS Lambda that uses our prediction algorithm
	  // from the ML output
	  d3.json(awsApiGatewayUrl, {
		method:"POST",
		body: JSON.stringify(data),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
			}
		}).then(json => {
			var predictedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(json.predicted_home_value);
			d3.select("#predictedValue").property("value", predictedValue);
			d3.select("#result").style("visibility", "visible");
		});
}

(function () {
	'use strict'
  
	var form = document.querySelector('.needs-validation')
	var formSubmit = document.querySelector('#btnJimpEstimate')
  
	formSubmit.addEventListener('click', function (event) {
		if (!form.checkValidity()) {
			event.preventDefault()
			event.stopPropagation()
			form.classList.add('was-validated')	
		} else {
		 	GetJIMPestimateValue();
		}		
	}, false);
	 
  })()

