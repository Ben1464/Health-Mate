document.getElementById('estimatorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;

    if (!name || isNaN(age) || isNaN(weight) || isNaN(height)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const bmi = weight / (height * height);
    provideFeedback(name, bmi);

    // After providing feedback, make the output fade in
    const outputElem = document.getElementById('output');
    setTimeout(() => {
        outputElem.style.opacity = 1;
    }, 100);
});

function provideFeedback(name, bmi) {
    const bmiAdviceElem = document.getElementById('bmi-advice');
    const riskAdviceElem = document.getElementById('risk-advice');
    //const hospitalAdviceElem = document.getElementById('hospital-advice');
    const mealPlanElem = document.querySelector('.meal-plan');

    let bmiAdvice = `Dear ${name}, `;
    let riskAdvice = "";
    let hospitalAdvice = "";
    let mealPlanContent = "";

    // BMI calculation and feedback
    if (bmi < 18.5) {
        bmiAdvice += "Based on your BMI, you're underweight.";
        riskAdvice = "These are some of the most common predisposed risks of being underweight: Weakened immune system, Osteoporosis, Anemia. Consult a health professional for further diagnostics.";
        // hospitalAdvice = [
        //     { name: "Nairobi Hospital", location: "Nairobi", website: "https://www.nairobihospital.org/" },
        //     { name: "Aga Khan University Hospital", location: "Nairobi", website: "https://www.agakhanhospitals.org/kenya/" },
        //     { name: "Kenyatta National Hospital", location: "Nairobi", website: "https://knh.or.ke/" },
        //     { name: "Mombasa Hospital", location: "Mombasa", website: "https://www.themombasahospital.com/" },
        //     { name: "Eldoret Hospital", location: "Eldoret", website: "https://www.realeldoret.co.ke/places-to-visit-in-eldoret/hospitals-in-eldoret/" }
        // ];
        mealPlanContent = populateMealPlan(bmi);
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiAdvice += "Congratulations! Based on your BMI, you're within the normal weight range.";
        riskAdvice = "Within this range you are associated with the lowest health risks. Maintain a balanced diet and live an active life to maintain the status quo.";
        mealPlanContent = populateMealPlan(bmi);
    } else if (bmi >= 25 && bmi < 29.9) {
        bmiAdvice += "Beside your BMI indicating that you're overweight,There is an opportunity for improvement. Small changes can make a big difference in your well-being.";
        riskAdvice = "This can lower risks of heart diseases, certain cancers, and liver disease.";
        // hospitalAdvice = [
        //     { name: "Nairobi Hospital", location: "Nairobi", website: "https://www.nairobihospital.org/" },
        //     { name: "Aga Khan University Hospital", location: "Nairobi", website: "https://www.agakhanhospitals.org/kenya/" },
        //     { name: "Kenyatta National Hospital", location: "Nairobi", website: "https://knh.or.ke/" },
        //     { name: "Mombasa Hospital", location: "Mombasa", website: "https://www.themombasahospital.com/" },
        //     { name: "Eldoret Hospital", location: "Eldoret", website: "https://www.realeldoret.co.ke/places-to-visit-in-eldoret/hospitals-in-eldoret/" }
        // ];
        mealPlanContent = populateMealPlan(bmi);
    } else {
        bmiAdvice += "Beside your BMI being high it suggests opportunities for improvement. Small changes can make a big difference in your well-being. If you need support, I'm here for you. ";
        riskAdvice = "This can lower risks of heart diseases, certain cancers, and liver disease..";
        // hospitalAdvice = [
        //     { name: "Nairobi Hospital",  website: "https://www.nairobihospital.org/" },
        //     { name: "Aga Khan University Hospital",  website: "https://www.agakhanhospitals.org/kenya/" },
        //     { name: "Kenyatta National Hospital",  website: "https://knh.or.ke/" },
        //     { name: "Mombasa Hospital", website: "https://www.themombasahospital.com/" },
        //     { name: "Eldoret Hospital", website: "https://www.realeldoret.co.ke/places-to-visit-in-eldoret/hospitals-in-eldoret/" }
        // ];
        mealPlanContent = populateMealPlan(bmi);
    }

    // Displaying BMI and risk advice
    bmiAdviceElem.innerText = bmiAdvice;
    riskAdviceElem.innerText = riskAdvice;

    // Displaying hospital advice
    if (hospitalAdvice.length > 0) {
        hospitalAdviceElem.innerHTML = ""; // Clear existing content
        hospitalAdvice.forEach(hospital => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${hospital.name}</td>
                <td><a href="${hospital.website}" target="_blank">${hospital.website}</a></td>
            `;
            hospitalAdviceElem.appendChild(row);
        });
    }

    // Displaying meal plan
    mealPlanElem.innerHTML = mealPlanContent;
}

function populateMealPlan(bmi) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let mealPlanContent = "";

    days.forEach(day => {
        let breakfast, lunch, supper;

        if (bmi < 18.5) {
            breakfast = "2 eggs and a banana smoothie";
            lunch = "Rice with beans/peas, greens, and avocado";
            supper = "Ugali with beef and greens";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            breakfast = "Sugarless tea/coffee with boiled sweet potatoes or yams";
            lunch = "Githeri with greens and avocado";
            supper = "Potatoes with beef and vegetable salad";
        } else if (bmi >= 25 && bmi < 29.9) {
            breakfast = "Sugarlesss and milkless tea/coffee";
            lunch = "Protein of your choice with greens and avocado";
            supper = "Controlled portions of complex carbohydrates like Githeri, Yams and Ndumas with greens of your choice";
        } else {
            breakfast = "Sugarless and milkless tea/coffee";
            lunch = "Controlled portions of whole protein of your choice with greens";
            supper = "Complex carbohydrates like arrowroot and yams with beef stew";
        }

        mealPlanContent += `
            <tr>
                <td colspan="2" style="background-color: #f7f7f7; font-weight: bold;">${day}</td>
            </tr>
            <tr>
                <td>Breakfast</td>
                <td>${breakfast}</td>
            </tr>
            <tr>
                <td>Lunch</td>
                <td>${lunch}</td>
            </tr>
            <tr>
                <td>Supper</td>
                <td>${supper}</td>
            </tr>
        `;
    });

    return mealPlanContent;
}
let currentYear= new Date().getFullYear();
document.getElementById("currentYear").innerHTML=currentYear;
