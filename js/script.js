const resetButton = document.getElementById("reset-button");
const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people-input");
const customTipInput = document.getElementById("tip-input");
const selectTipBtn = document.querySelectorAll(".tip-percentage");
const customTipContainer = document.getElementById("tip-custom");
const totalAmount = document.getElementById("total-amount");
const tipAmount = document.getElementById("tip-amount");
const peopleError = document.querySelector(".form-error");

const ResetAll = () => {
  billInput.value = "";
  peopleInput.value = "";
  selectTipBtn.forEach((tipBtn) => {
    tipBtn.classList.remove("active");
  });
  customTipContainer.classList.remove("active");
  totalAmount.textContent = "$0.00";
  tipAmount.textContent = "$0.00";
  customTipInput.value = "";
};

const resetResult = () => {
  totalAmount.textContent = "$0.00";
  tipAmount.textContent = "$0.00";
};

const Calculate = () => {
  if (!billInput.value) return resetResult();
  if (!peopleInput.value) return resetResult();

  const customTipActive = document.querySelector(".tip-custom.active");
  let tipPercentage = parseInt(
    document
      .querySelector(".tip-percentage.active")
      ?.getAttribute("data-percentage")
  );

  if (customTipActive) {
    tipPercentage = parseFloat(customTipInput.value);
  }

  if (!tipPercentage) return resetResult();

  const tip = parseFloat(billInput.value) * (tipPercentage / 100);
  const person =
    (parseFloat(billInput.value) + tip) / parseInt(peopleInput.value);

  tipAmount.textContent = `$${tip.toFixed(2)}`;

  totalAmount.textContent = `$${person.toFixed(2)}`;
};

billInput.addEventListener("change", () => {
  Calculate();
});

customTipInput.addEventListener("change", () => {
  Calculate();
});

peopleInput.addEventListener("change", () => {
  if (peopleInput.value == 0) {
    peopleInput.classList.add("input-error");
    peopleError?.classList.remove("hide");
  } else {
    peopleInput.classList.remove("input-error");
    peopleError?.classList.add("hide");
  }
  Calculate();
});

selectTipBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    selectTipBtn.forEach((tipBtn) => {
      tipBtn.classList.remove("active");
    });

    e.target.classList.add("active");
    customTipContainer.classList.remove("active");
    Calculate();
  });
});

customTipInput.addEventListener("click", () => {
  selectTipBtn.forEach((tipBtn) => {
    tipBtn.classList.remove("active");
  });
  customTipContainer.classList.add("active");
});

resetButton.addEventListener("click", function () {
  ResetAll();
});
