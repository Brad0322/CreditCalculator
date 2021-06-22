$(document).ready(function () {
    let creditSum = $("#credit_sum");
    let annualSum = $("#annual_sum");
    let initialSum = $("#initial_sum");
    let period = $("#period");

    let dailyPayment;
    $("button").click(function () {

        let temporaryHelper = "";
        let mainDebt = 0;
        mainDebt = creditSum.val() - creditSum.val() * initialSum.val() / 100;
        let monthlyPayment = mainDebt / period.val();

        let date = new Date();
        for (let i = 1; i <= period.val(); i++) {
            dailyPayment = mainDebt * annualSum.val() / 100 / 365;
            let additionalDate = moment(date).add(i-1, 'M');

            temporaryHelper += "<tr>" +
                "<td>" + (i) + "</td>" +
                "<td>" + (additionalDate.format("YYYY-MM-DD")) + "</td>" +
                "<td>" + (mainDebt) + "</td>" +
                "<td>" + (monthlyPayment) + "</td>" +
                "<td>" + (getInterestPayment(date,dailyPayment,i-1)) + "</td>" +                    // foiz tolov oyiga
                "<td>" + (getInterestPayment(date,dailyPayment,i-1) + monthlyPayment) + "</td>" +   // umumiy tolov
                "<td>" +(new Date(date.getFullYear(), date.getMonth() + (i-1), 0).getDate())  + "</td>" +
                "</tr>"

            mainDebt = mainDebt - monthlyPayment;
        }

        $("#result").html(temporaryHelper);
    })

    function getInterestPayment(date, dailyPayment,i) {
        return dailyPayment * (new Date(date.getFullYear(), date.getMonth() + i, 0).getDate());
    }


});