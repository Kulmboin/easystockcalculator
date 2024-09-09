function showCalculator(calculatorType) {
    const basicCalculator = document.getElementById('basic-calculator');
    const dividendCalculator = document.getElementById('dividend-calculator');

    if (calculatorType === 'basic') {
        basicCalculator.classList.add('active');
        dividendCalculator.classList.remove('active');
    } else if (calculatorType === 'dividend') {
        basicCalculator.classList.remove('active');
        dividendCalculator.classList.add('active');
    }
}

function calculateBasic() {
    const principal = parseFloat(document.getElementById('initialAmount').value);
    const years = parseFloat(document.getElementById('investmentPeriod').value);
    const rate = parseFloat(document.getElementById('interestRate').value) / 100;

    if (isNaN(principal) || isNaN(years) || isNaN(rate)) {
        alert('Please enter valid numbers');
        return;
    }

    const tbody = document.querySelector('#basicTable tbody');
    tbody.innerHTML = '';

    for (let year = 1; year <= years; year++) {
        const futureValue = principal * Math.pow((1 + rate), year);

        const row = `<tr>
                        <td>${year}</td>
                        <td>$${principal.toFixed(2)}</td>
                        <td>${(rate * 100).toFixed(2)}</td>
                        <td>$${futureValue.toFixed(2)}</td>
                     </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    }
}

function calculateDividend() {
    let principal = parseFloat(document.getElementById('initialAmountDividend').value);
    const additional = parseFloat(document.getElementById('additionalAmount').value);
    let stockPrice = parseFloat(document.getElementById('stockPrice').value);
    const years = parseFloat(document.getElementById('investmentPeriodDividend').value);
    const rate = parseFloat(document.getElementById('dividendRate').value) / 100;
    const reinvest = document.getElementById('reinvestDividends').value === 'y';

    if (isNaN(principal) || isNaN(years) || isNaN(additional) || isNaN(rate) || isNaN(stockPrice)) {
        alert('Please enter valid numbers');
        return;
    }

    const tbody = document.querySelector('#dividendTable tbody');
    tbody.innerHTML = '';

    let totalInvestment = principal;
    let remainingAmount = 0;
    let totalStocks = Math.floor(principal / stockPrice);
    remainingAmount = principal % stockPrice;

    for (let year = 1; year <= years; year++) {
        let dividend = totalStocks * stockPrice * rate;

        // 첫 번째 기간에는 추가 투자 금액이 포함되지 않음
        if (year > 1) {
            totalInvestment += additional;
            remainingAmount += additional;
        }

        if (reinvest) {
            let newStocks = Math.floor((remainingAmount + dividend) / stockPrice);
            remainingAmount = (remainingAmount + dividend) % stockPrice;
            totalStocks += newStocks;
        } else {
            remainingAmount += dividend;
        }

        const row = `<tr>
                        <td>${year}</td>
                        <td>$${totalInvestment.toFixed(2)}</td>
                        <td>${totalStocks}</td>
                        <td>$${remainingAmount.toFixed(2)}</td>
                        <td>${(rate * 100).toFixed(2)}</td>
                        <td>$${dividend.toFixed(2)}</td>
                        <td>$${(totalStocks * stockPrice + remainingAmount).toFixed(2)}</td>
                     </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showCalculator('basic');  // 기본적으로 기본 복리 계산기가 보이도록 설정
});
