//app.js
//NW Bootcamp - Project 3 CA Home Value Prediction Using ML

// AWS API Gateway Url for AWS Lambda Function
var awsApiGatewayUrl = "https://m0rnqlct08.execute-api.us-east-2.amazonaws.com/prod/predict-home-value-function"

function GetJIMPestimateValue(event){

	//Get the input for the predictor model
	var housingAge = d3.select("#txtHousingAge").property('value');
	var roomsPerHousehold = d3.select("#txtRoomsPerHouseHold").property('value');
	var medianIncome = d3.select("#txtMedianIncome").property('value');
	var homeArea = d3.select("#txtHomeArea").property('value');
	var inland = d3.select("#selectInland").property('value');
	var island = d3.select("#selectIsland").property('value');
	var nearBay = d3.select("#selectBay").property('value');
	var nearOcean = d3.select("#selectOcean").property('value');
	var lessThan1Hr = d3.select("#selectOneHr").property('value');

	//Prepare the JSON for AWS API gateway post method input model parameter
	var data = {
		"housing_age": parseInt(housingAge),
		"rooms_per_household": parseInt(roomsPerHousehold),
		"median_income": parseInt(medianIncome),
		"inland": parseInt(inland),
		"island": parseInt(island),
		"near_bay": parseInt(nearBay),
		"near_ocean": parseInt(nearOcean),
		"less_than_1_hr": parseInt(lessThan1Hr),
		"housing_age_sq_ft": parseInt(homeArea)
	  }

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

