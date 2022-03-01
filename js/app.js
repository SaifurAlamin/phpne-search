const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    searchField.value = '';
    //clear all previous load data
    document.getElementById('phone-details').innerText = '';
    document.getElementById('phone-search').innerText = '';
    document.getElementById('show-error').innerText = '';
    if (searchFieldText == '') {
        document.getElementById('show-error').innerText = 'Please Enter a Phone Name!'
    }

    else {
        const url = (`https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`)
        fetch(url)
            .then(res => res.json())
            .then(data => searchResult(data.data))
    }

}
// Search Phone Result **Max 20 phone**
const searchResult = (allPhones) => {
    const divContainer = document.getElementById('phone-search')
    divContainer.textContent = '';
    if (allPhones.length == 0) {
        document.getElementById('show-error').innerText = 'Phone Not Found!'
    }
    else {
        const phones = allPhones.slice(0, 20)
        phones.forEach(phone => {
            // console.log(phone)

            const div = document.createElement('div')
            div.innerHTML = `
        <div class="col ">
            <div class="card shadow p-3 mb-5 bg-body rounded mx-auto">
                <img src="${phone.image}" class="card-img-fluid mx-auto " style="max-width:300px" alt="...">
                <div class="card-body">
                    <h5 class=" text-center">${phone.phone_name}</h5>
                    <h5 class=" text-center">${phone.brand}</h5>
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button onclick="phoneDetails('${phone.slug}')" class="btn btn-info ms-2">Details</button>
                    </div>
                    
                </div>
            </div>
        </div>`
            divContainer.appendChild(div)
        })
    }
}
//Phone Details

const phoneDetails = phoneId => {
    const url = (`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.data))
    document.getElementById('show-error').innerText = '';
}

// Show Phone Details 

const displayMealDetails = details => {
    const detailsContianer = document.getElementById('phone-details');
    console.log(detailsContianer)
    detailsContianer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="row rounded shadow">
        <div class="col-md-4 mt-4">
            <img src="${details.image}" class="img-fluid rounded" alt="...">
            <h5>Name: ${details.name}</h5>
                <h6>Release Date: ${details.releaseDate ? details.releaseDate : 'Not updated yet'}</h6>
        </div>
        <div class="col-md-8 text-break ">
            <div class="card-body ">
                <h4 class="text-info text-center">Main Features</h4>
                <h5>Display: ${details.mainFeatures.displaySize}</h5>
                <h5>Storage: ${details.mainFeatures.storage}</h5>
                <h5>Chip Set: ${details.mainFeatures.chipSet}</h5>
                <h5>Memory: ${details.mainFeatures.memory}</h5>
                <h4 class="text-info text-center">Sensors</h4>
                <h5>Sensors: ${details.mainFeatures.sensors}</h5>
                <h4 class="text-info text-center">Others</h4>
                 <h5 >WLAN: ${details?.others?.WLAN ? details.others.WLAN : 'not found'}</h5>
                <h5>Bluetooth: ${details?.others?.Bluetooth ? details.others.Bluetooth : 'not found'}</h5>
                <h5>GPS: ${details?.others?.GPS ? details.others.GPS : 'not found'}</h5>
                <h5>NFC: ${details?.others?.NFC ? details.others.NFC : 'not found'}</h5>
                <h5>Radio: ${details?.others?.Radio ? details.others.Radio : 'not found'}</h5>
                <h5>USB: ${details?.others?.USB ? details.others.USB : 'not found'}</h5>
               
            </div>
        </div>
    </div>`;
    detailsContianer.appendChild(div);
    window.scroll(0, 115)

}

