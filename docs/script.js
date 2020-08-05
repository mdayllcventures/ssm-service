const submitButton = document.querySelector('button');

const apiKeyInput = document.querySelector('#api');
const phoneNumbersInput = document.querySelector('#phone');
const textMessageInput = document.querySelector('#sms');

const sendSMS = async (apiKey, phoneNumbers, textMessage) => {

    try {

        console.log(phoneNumbers);

        const sendSMSResponse = await fetch('https://r21feli8sl.execute-api.us-east-1.amazonaws.com/dev/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({
                textMessage,
                phoneNumbers
            })
        });

        return { data: await sendSMSResponse.json() };

    } catch (error) {

        console.log(error);
        return { error: 'An error occured, contact Shina!!!' };

    }

}

// register event
submitButton.addEventListener('click', async function (event) {

    event.preventDefault();

    const apiKey = apiKeyInput.value;
    const textMessage = textMessageInput.value;
    let phoneNumbers = phoneNumbersInput.value;


    if (apiKey.length === 0 || phoneNumbers.length === 0 || textMessage.length === 0) {

        return alert('apikey, phone numbers and text message must be entered');

    }

    phoneNumbers = phoneNumbersInput.value.replace(/\s/g, '').split(',');

    const apiFeedBack = await sendSMS(apiKey, phoneNumbersInput, textMessage);

    if (apiFeedBack.error) {

        return alert(apiFeedBack.error);

    }

    return alert('Success: SMS successfully sent');

});


