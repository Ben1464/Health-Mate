document.getElementById('estimatorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    if (!name || isNaN(age) || isNaN(weight) || isNaN(height)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const feet = Math.floor(height);
    const inches = (height - feet) * 10; // Convert decimal part to inches
    const heightInInches = (feet * 12) + inches; // Convert total height to inches
    const heightMeters = heightInInches * 0.0254; // Convert height to meters
    const bmi = weight / (heightMeters * heightMeters); // Calculate BMI
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
    const mealPlanElem = document.querySelector('.meal-plan');

    let bmiAdvice = `Dear ${name}, `;
    let riskAdvice = "";
    let mealPlanContent = "";

    // BMI calculation and feedback
    if (bmi < 18.5) {
        bmiAdvice += "Your BMI suggests that you are underweight. It's important to focus on nutrient-dense foods to help you reach a healthier weight.";
        riskAdvice = "Being underweight can lead to a weakened immune system, osteoporosis, and anemia. Consider consulting a healthcare professional for personalized advice.";
        mealPlanContent = populateMealPlan(bmi);
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiAdvice += "Congratulations! Your BMI is within the healthy weight range. Continue maintaining a balanced diet and staying active to keep up the good work.";
        riskAdvice = "You're associated with the lowest health risks. Keep up with a healthy lifestyle to sustain your well-being.";
        mealPlanContent = ""; // No meal plan needed for healthy weight
    } else if (bmi >= 25 && bmi < 29.9) {
        bmiAdvice += "Your BMI indicates that you're slightly overweight. Incorporating small, manageable changes into your diet and exercise routine can make a big difference.";
        riskAdvice = "Carrying extra weight may increase the risk of heart disease, certain cancers, and liver disease. Consider consulting a nutritionist or trainer for guidance.";
        mealPlanContent = populateMealPlan(bmi);
    } else {
        bmiAdvice += "Your BMI is in the obese range, which can increase the risk of serious health conditions. Focus on gradual, sustainable changes in your diet and physical activity.";
        riskAdvice = "Reducing your BMI can significantly lower risks for heart disease, diabetes, and other health issues. Support from a healthcare professional could be beneficial.";
        mealPlanContent = populateMealPlan(bmi);
    }

    // Displaying BMI and risk advice
    bmiAdviceElem.innerText = bmiAdvice;
    riskAdviceElem.innerText = riskAdvice;

    // Displaying meal plan (only if applicable)
    mealPlanElem.innerHTML = mealPlanContent;
}

function populateMealPlan(bmi) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let mealPlanContent = "";

    days.forEach(day => {
        let breakfast, lunch, dinner;

        if (bmi < 18.5) {
            // Underweight: Focus on high-calorie, nutrient-dense foods
            breakfast = "Boiled sweet potatoes, two boiled eggs, and tea.";
            lunch = "Ugali with nyama choma (grilled meat) and sukuma wiki (collard greens).";
            dinner = "Pilau with a side of chapati and a fruit smoothie.";
        } else if (bmi >= 25 && bmi < 29.9) {
            // Overweight: Controlled portions with balanced nutrients
            breakfast = "Boiled sweet potatoes and tea.";
            lunch = "Sukuma wiki with a small portion of ugali and grilled tilapia.";
            dinner = "Vegetable stew with a small serving of brown rice.";
        } else if (bmi >= 30) {
            // Obese: Portion control and low-calorie, nutrient-rich foods
            breakfast = "Fresh fruit salad and a cup of black coffee.";
            lunch = "Mixed vegetable soup with a side of grilled chicken breast.";
            dinner = "Steamed vegetables with a small portion of lean meat and a side of salad.";
        }

        if (bmi !== null && (bmi < 18.5 || bmi >= 25)) {
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
                    <td>Dinner</td>
                    <td>${dinner}</td>
                </tr>
            `;
        }
    });

    return mealPlanContent;
}

let currentYear = new Date().getFullYear();
document.getElementById("currentYear").innerHTML = currentYear;
