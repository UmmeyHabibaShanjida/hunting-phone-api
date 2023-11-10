const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhones(phones);
}


const displayPhones = phones =>{
    //  console.log(phones);

    const phoneContainer = document.getElementById('phone-container');

    // clear the phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
      showAllContainer.classList.add('hidden');
    }

    // display only first 12 phones
    phones = phones.slice(0 , 12);

    phones.forEach(phone =>{
        // console.log(phone);
        // 2.create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;

        // set innerText or innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick ="handleShowDetail('${phone.slug}');" class="btn btn-primary">Show Details</button>
          </div>
        </div>`;

        // appendChild
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}


// show phone details
const handleShowDetail = async (id) =>{
  console.log('clicked show details', id);
  // load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
console.log(phone)

const phoneName = document.getElementById('show-detail-phone-name');
phoneName.innerText = phone.name;

const showDetailContainer = document.getElementById('show-detail-container');
showDetailContainer.innerHTML = `
<img src="${phone.image}" alt=""/>
<p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
<p><span>Display Size:</span>${phone.mainFeatures.displaySize}</p>
<p><span>Release Date:</span>${phone.releaseDate}</p>
<p><span>Brand:</span>${phone.brand}</p>
<p><span>GPS:</span>${phone?.others?.GPS || 'No GPS Available'}</p>

`

    //  show the modal
    show_details_modal.showModal();
}


// handle search button
 const handleSearch = () =>{
  toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText);

 }

 const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
 }

// loadPhone()