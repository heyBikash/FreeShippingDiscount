    let FreeShippingDiscount = {
      store_id: "shopify_store_123",
      freeShippingAmount: "",
      currency: "USD",
      currencySymbol: "$",
      ShippingTitle: "my title",
      updatedCurrencyPosition: "amount",
      currencySymbolPosition: "before amount",
      progressCartValue: 0,
      currentCartValue: 400,
      remainingAmount: 0,
      isFreeShippingAchieved: false,
      styleBar: {
        fontFamily: "Segoe UI",
        fontSize: "18px",
        backgroundColor: "#d3d3d3",
        textColor: "#000000",
        specialTextColor: "#FF0000",
      },
      messagesBar: {
        InitialMessageBar:
          "Get your shopping on! Add $100 more for free shipping.",
        ProgressMessageBar: "Add $X more to get free shipping!",
        GoalMessageBar: "🎉 You’ve unlocked free shipping!",
      },
      updatedAt: new Date().toISOString(),
    };

    // Populate font family buttons and capture font-family style
    document.addEventListener("DOMContentLoaded", function () {
      const fontFamilyType = {
        fonts: [
          "Lato",
          "Roboto",
          "Josefin Sans",
          "Lobster",
          "Open Sans",
          "Poiret One",
          "Dancing Script",
          "Bangers",
          "Playfair Display",
          "Chewy",
          "Quicksand",
          "Great Vibes",
          "Righteous",
          "Crafty Girls",
          "Mystery Quest",
          "Montserrat",
          "Oswald",
          "Unica One",
          "Mulish",
          "Raleway",
          "Carter One",
          "Varela Round",
          "Julius Sans One",
        ],
      };
      let previewMsgBlock = document.querySelectorAll(".preview-msg");
      const fontFamilyContainer =
        document.getElementsByClassName("font-list")[0];
      fontFamilyType.fonts.forEach((font) => {
        const btn = document.createElement("button");
        btn.innerText = font;
        btn.style.fontFamily = font;
        btn.addEventListener("click", () => {
          previewMsgBlock.forEach((input) => {
            input.style.fontFamily = font;
            FreeShippingDiscount.styleBar["fontFamily"] = font;
          });
        });
        fontFamilyContainer.appendChild(btn);
      });
    });

    // capture font size
    const fontSizeInput = document.querySelector(".font-size-appear");
    fontSizeInput.addEventListener("input", (event) => {
      const fontSize = event.target.value + "px";
      let previewMsgBlock = document.querySelectorAll(".preview-msg");
      previewMsgBlock.forEach((input) => {
        input.style.fontSize = fontSize;
        FreeShippingDiscount.styleBar["fontSize"] = fontSize;
      });
    });

    // background color capture
    const backgroundColorInput = document.querySelector(
      ".background-color-appear"
    );
    backgroundColorInput.addEventListener("input", (event) => {
      const backgroundColor = event.target.value;
      let previewMsgBlock = document.querySelectorAll(".preview-msg");
      previewMsgBlock.forEach((input) => {
        input.style.backgroundColor = backgroundColor;
        FreeShippingDiscount.styleBar["backgroundColor"] = backgroundColor;
      });
    });

    // text color capture
    const textColorInput = document.querySelector(".text-color-appear");
    textColorInput.addEventListener("input", (event) => {
      const textColor = event.target.value;
      let previewMsgBlock = document.querySelectorAll(".preview-msg");
      previewMsgBlock.forEach((input) => {
        input.style.color = textColor;
        FreeShippingDiscount.styleBar["textColor"] = textColor;
      });
    });

    // special text color capture
    const specialTextColorInput = document.querySelector(
      ".special-text-color-appear"
    );
    specialTextColorInput.addEventListener("input", (event) => {
      const specialTextColor = event.target.value;
      let previewMsgBlock = document.querySelectorAll(".preview-msg");
      previewMsgBlock.forEach((input) => {
        input.style.color = specialTextColor;
        FreeShippingDiscount.styleBar["specialTextColor"] = specialTextColor;
      });
    });

    // shipping bar title capture
    const shippingBarTitle = document.querySelector(".shipping-bar-title");
    shippingBarTitle.addEventListener("input", (event) => {
      const title = event.target.value;
      FreeShippingDiscount["ShippingTitle"] = title;
    });

    // currency capture
    let currencyInput = document.querySelector(".currency");
    currencyInput.addEventListener("input", (event) => {
      const currency = event.target.value;
      FreeShippingDiscount["currency"] = currency;
    });

    // ----------------------------------------
    // Grab the inputs once
    const freeShippingGoalInput = document.querySelector(".free-shipping-goal");
    const goalAmountTag = document.querySelector(".free-shipping-goal-amount");
    let progressAmountTag = document.querySelector(
      ".free-progress-goal-amount"
    );

    // Helper – set the *current* cart total (you will call this later when you have the real cart object)
    function setCartTotal(newTotal) {
      FreeShippingDiscount.currentCartValue = Number(newTotal) || 0;
      updateShippingStatus(); // recalc instantly
    }

    // Core calculation + logging + DOM update
    function updateShippingStatus() {
      const goalValue = Number(freeShippingGoalInput.value) || 0;
      const cartValue = Number(FreeShippingDiscount.currentCartValue) || 0;
      const remaining = goalValue - cartValue;
      FreeShippingDiscount.remainingAmount = Math.abs(remaining);
      FreeShippingDiscount.freeShippingAmount = goalValue;
      FreeShippingDiscount.remainingAmount = remaining;
      FreeShippingDiscount.isFreeShippingAchieved = remaining <= 0;

      goalAmountTag.textContent = `${FreeShippingDiscount.currencySymbol}${goalValue}`;

      if (remaining > 0) {
        progressAmountTag.textContent = `${FreeShippingDiscount.currencySymbol}${remaining}`;
      } else {
        progressAmountTag.textContent = "0";
      }
      // log outputs
      if (cartValue >= goalValue) {
        console.log("Free Shipping Achieved!");
      } else {
        console.log(
          `Free Shipping Not Achieved. Add ${FreeShippingDiscount.currencySymbol}${remaining} more to unlock free shipping.`
        );
      }

      console.log("Shipping Status:", {
        goalValue,
        cartValue,
        remaining,
        achieved: FreeShippingDiscount.isFreeShippingAchieved,
      });
    }

    // run once on page load first time
    updateShippingStatus();
    // recalc every time the user changes the goal
    freeShippingGoalInput.addEventListener("input", updateShippingStatus);

    // setCartTotal(realCartTotal);
    //  setCartTotal(shopifyCart.subtotal_price / 100);
    // setCartTotal(shopifyCart.subtotal_price);
    // ----------------------------------------

    // currency symbol capture
    let currencySymbolInput = document.querySelector(".currency-symbol");
    currencySymbolInput.addEventListener("input", (event) => {
      const currencySymbol = event.target.value;
      FreeShippingDiscount["currencySymbol"] = currencySymbol;

      // --- Update preview messages dynamically ---
      const amount = FreeShippingDiscount.freeShippingAmount || "XX";

      // Initial Message
      const preInitial = document.querySelector(".pre-initial-message").value;
      const postInitial = document.querySelector(".post-initial-message").value;
      const initialPreview = document.getElementsByClassName("preview-msg")[0];
      initialPreview.value = `${preInitial} ${currencySymbol}${amount} ${postInitial}`;
      FreeShippingDiscount.messagesBar["InitialMessageBar"] =
        initialPreview.value;

      // Progress Message
      const preProgress = document.querySelector(".pre-progress-message").value;
      const postProgress = document.querySelector(
        ".post-progress-message"
      ).value;
      const progressPreview = document.getElementsByClassName("preview-msg")[1];
      progressPreview.value = `${preProgress}${currencySymbol}${amount} ${postProgress}`;
      FreeShippingDiscount.messagesBar["ProgressMessageBar"] =
        progressPreview.value;

      // Goal Message
      const preGoal = document.querySelector(".pre-goal-message").value;
      const postGoal = document.querySelector(".post-goal-message").value;
      const goalPreview = document.getElementsByClassName("preview-msg")[2];
      goalPreview.value = `${preGoal}${currencySymbol}${amount} ${postGoal}`;
      FreeShippingDiscount.messagesBar["GoalMessageBar"] = goalPreview.value;
    });

    // currency symbol position capture
    let currencySymbolPositionInput = document.querySelector(
      ".currency-symbol-position"
    );

    currencySymbolPositionInput.addEventListener("input", (event) => {
      let currencySymbolPosition = event.target.value;
      if (currencySymbolPositionInput == "before-amount") {
        FreeShippingDiscount["updatedCurrencyPosition"] =
          FreeShippingDiscount.currencySymbol +
          FreeShippingDiscount.freeShippingAmount;
      } else {
        FreeShippingDiscount["updatedCurrencyPosition"] =
          FreeShippingDiscount.freeShippingAmount +
          FreeShippingDiscount.currencySymbol;
      }
    });

    // freeShippingGoal capture
    const freeShippingGoal = document.querySelector(".free-shipping-goal");
    freeShippingGoal.addEventListener("input", (event) => {
      const goalAmount = event.target.value;
      FreeShippingDiscount["freeShippingAmount"] = goalAmount;
    });

    // initial message (pre + post)
    const preInitialMessage = document.querySelector(".pre-initial-message");
    const postInitialMessage = document.querySelector(".post-initial-message");
    const InitialPreviewInput =
      document.getElementsByClassName("preview-msg")[0];
    let currencySymbolPreference = FreeShippingDiscount.currencySymbol;
    preInitialMessage.addEventListener("input", (event) => {
      preInitialMessage = event.target.value;
      const combinedMessage = `${preInitialMessage} ${currencySymbolPreference}${FreeShippingDiscount.freeShippingAmount} ${postInitialMessage.value}`;
      FreeShippingDiscount.messagesBar["InitialMessageBar"] = combinedMessage;
      InitialPreviewInput.value = combinedMessage;
    });

    postInitialMessage.addEventListener("input", (event) => {
      const postMessage = event.target.value;
      const combinedMessage = `${preInitialMessage.value} ${currencySymbolPreference}${FreeShippingDiscount.freeShippingAmount} ${postMessage}`;
      FreeShippingDiscount.messagesBar["InitialMessageBar"] = combinedMessage;
      InitialPreviewInput.value = combinedMessage;
    });

    // progress message (pre + post)
    const preProgressMessage = document.querySelector(".pre-progress-message");
    const postProgressMessage = document.querySelector(
      ".post-progress-message"
    );
    const ProgressPreviewInput =
      document.getElementsByClassName("preview-msg")[1];
    preProgressMessage.addEventListener("input", (event) => {
      preProgressMessage = event.target.value;
      const combinedMessage = `${preProgressMessage} ${currencySymbolPreference}${FreeShippingDiscount.remainingAmount} ${postProgressMessage.value}`;
      FreeShippingDiscount.messagesBar["ProgressMessageBar"] = combinedMessage;
      ProgressPreviewInput.value = combinedMessage;
    });
    postProgressMessage.addEventListener("input", (event) => {
      const postMessage = event.target.value;
      const combinedMessage = `${preProgressMessage.value} ${currencySymbolPreference}${FreeShippingDiscount.remainingAmount} ${postMessage}`;
      FreeShippingDiscount.messagesBar["ProgressMessageBar"] = combinedMessage;
      ProgressPreviewInput.value = combinedMessage;
    });

    // goal message (pre)
    const preGoalMessage = document.querySelector(".pre-goal-message");
    // const postGoalMessage = document.querySelector(".post-goal-message");

    const GoalPreviewInput = document.getElementsByClassName("preview-msg")[2];
    preGoalMessage.addEventListener("input", (event) => {
      const preMessage = event.target.value;
      const combinedMessage = `${preMessage}`;
      FreeShippingDiscount.messagesBar["GoalMessageBar"] = combinedMessage;
      GoalPreviewInput.value = combinedMessage;
      if (GoalPreviewInput.value === "") {
      }
    });

    let Base_Api = "https://free-shipping-discount-pz9g.vercel.app";
     function fetchApi() {
      try {
        const data =  fetch(`https://free-shipping-discount-pz9g.vercel.app/get-fsb/shopify_store_003`).then(res=>res.json())
        console.log(data.freeShippingBar);
      } catch (err) {
        console.log("Something went wrong", err);
      }
    }
    fetchApi();
    // log data on update button click
    const isErrorFreeShippingAmount = document.getElementsByClassName(
      "error-amount-not-fill"
    )[0];
    isErrorFreeShippingAmount.style.display = "none";
    const updateBtn = document.querySelector(".update-btn");
    updateBtn.addEventListener("click", () => {
      if (FreeShippingDiscount["freeShippingAmount"] === "") {
        isErrorFreeShippingAmount.style.display = "block";
        isErrorFreeShippingAmount.style.color = "red";
        return;
      } else {
        isErrorFreeShippingAmount.style.display = "none";
      }
      //   console.log(" Style_bar: ", FreeShippingDiscount.styleBar);
      console.log("FreeShippingDiscount:", FreeShippingDiscount);
      //   console.log(" Messages_bar: ", FreeShippingDiscount.messagesBar);
    });
