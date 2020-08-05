const submitButton = document.querySelector('button');

const phoneNumbersInput = document.querySelector('#phone');
const textMessageInput = document.querySelector('#sms');

const sendSMS = async (phoneNumbers, textMessage) => {

    try {

        console.log('phone numbers ', phoneNumbers);
        console.log('textMessage ', textMessage)

        const body = JSON.stringify({ textMessage, phoneNumbers });
        console.log('the body: ', body);

        await fetch('https://r21feli8sl.execute-api.us-east-1.amazonaws.com/dev/', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body
        });

        return { data: 'done correctly' };

    } catch (error) {

        console.log(error);
        return { error: 'An error occured, contact Shina!!!' };

    }

}

// register event
submitButton.addEventListener('click', async function (event) {

    event.preventDefault();

    const textMessage = textMessageInput.value;
    let phoneNumbers = phoneNumbersInput.value;


    if (phoneNumbers.length === 0 || textMessage.length === 0) {

        return alert('phone numbers and text message must be entered');

    }

    phoneNumbers = phoneNumbersInput.value.replace(/\s/g, '').split(',').map(number => Number(number));

    const apiFeedBack = await sendSMS(phoneNumbers, textMessage);

    if (apiFeedBack.error) {

        return alert(apiFeedBack.error);

    }

    return alert('Success: SMS successfully sent');

});


