// here we fetch our target url & get our necessary tools
const loadTools = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayTools(data.data.tools.slice(0, 6)))
    .catch(error =>{
      console.log(error)
    })
}

// declare a function for display tools details
const displayTools = (tools) =>{

     const seeMoreBtn = document.getElementById('seeMoreBtn');
     if(tools.length === 6){
      tools = tools.slice(0, 6)
      seeMoreBtn.classList.remove('d-none');
    }
    else{
      seeMoreBtn.classList.add('d-none');
      
    }
     
    
  
    const toolsContainer = document.getElementById('toolsContainer');
    toolsContainer.innerHTML ='';

    tools.forEach(tool => {
        const {features, image, name, published_in, id} = tool;
        const toolDiv = document.createElement('div')
        toolDiv.classList.add('col')
        toolDiv.innerHTML = `
        <div class="card h-100">
        <img src="${image}" class="card-img-top" alt="">
        <div class="card-body">
          <h4 class="card-title">Features :-</h4>
          <h6 class="card-text text-muted">1. ${features[0] || features[0] === null ? features[0] : 'Features Coming soon...'}</h6>
          <h6 class="card-text text-muted">2. ${features[1] || features[1] === null ? features[1] : 'Features Coming soon...'}</h6>
          <h6 class="card-text text-muted">3. ${features[2] || features[2] === null ? features[2] : 'Features Coming soon...'}</h6>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
        <div class="d-flex flex-column gap-2">
            <small class= "fw-bold">${name}</small>
            <time><i class="fa-regular fa-calendar-days"></i> ${published_in}</time>
            
       </div>
        <div>
          <button onclick="loadToolsDetails('${id}')" class="py-1 px-3 btn bg-danger-subtle text-danger" data-bs-toggle="modal" data-bs-target="#toolsModal"><i class="fa-solid fa-arrow-right"></i></button>
        </div>

        </div>
      </div>
        `;

        toolsContainer.appendChild(toolDiv);
    });
    toggleSpinner(false);
  
 }

//  loader function 
 const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none')
  }
  else{
      loaderSection.classList.add('d-none');
  }
}

// sort btn details
document.getElementById('sortBtn').addEventListener('click', function(){
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayTools(data.data.tools))
    .catch(error =>{
      console.log(error)
    })
    data.data.tools.sort(function(a, b){
      let c = new Date(a.published_in);
      let d = new Date(b.published_in);
      return c-d; 
    });

})

// see more btn details
 const seeMore = document.getElementById('moreToolsBtn').addEventListener('click', function(){
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayTools(data.data.tools))
  .catch(error =>{
    console.log(error)
  })
  
  toggleSpinner(true);
 })

//  here we fetch specific tool using there id
const loadToolsDetails =  id =>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data =>displayToolsDetails(data.data))
    .catch(error =>{
      console.log(error)
    } )
  }


// display modal details
const displayToolsDetails = item =>{
  const { image_link ,description, features, integrations, pricing, accuracy, input_output_examples} = item;

  const accuracyScore = (accuracy.score)*100;

  const modalDetailsLeft = document.getElementById('modalBodyLeft');
  const modalDetailsRight = document.getElementById('modalBodyRight');
  // left side of modal
  modalDetailsLeft.innerHTML = `
  <div class="card bg-warning-subtle p-3 border border-2 border-danger">
      <p class="fw-bold"> ${description || description === null ? description : 'No description'}</p>
  <div class="d-flex justify-content-around gap-4 mt-3">
      <h6 class="fs-6 fw-semibold p-2 shadow rounded text-success-emphasis"> ${pricing[0].price || pricing[0].price === null ? pricing[0].price : 'Free of Cost' } <span>${pricing || pricing === null ? pricing[0].plan : 'Basic'}</span></h6>
      <h6 class="fs-6 fw-semibold p-2 shadow rounded text-warning-emphasis"> ${pricing[1].price || pricing[1].price === null ? pricing[1].price : 'Free of Cost' } <span>${pricing || pricing === null ? pricing[1].plan : 'Pro'}</span></h6>
      <h6 class="fs-6 fw-semibold p-2 shadow rounded text-danger-emphasis"> ${pricing[2].price || pricing[2].price === null ? pricing[2].price : 'Free of Cost'} <span>${pricing || pricing === null ? pricing[2].plan : 'Enterprise' }</span></h6> 
  </div>

  <div class="d-flex justify-content-around gap-4 mt-3">
      <div>
          <p class="fw-bold"> Features :- </p>
          <li>${features['1'].feature_name || features['1'].feature_name === null ? features['1'].feature_name : 'Feature Unavailable'}</li>
          <li>${features['2'].feature_name || features['2'].feature_name === null ? features['2'].feature_name : 'Feature Unavailable'}</li>
          <li>${features['3'].feature_name || features['3'].feature_name === null ? features['3'].feature_name : 'Feature Unavailable'}</li>    
    </div> 
    <div>
        <p class="fw-bold"> Integrations :- </p>
        <li>${integrations || integrations === null ? integrations[0] : 'No data Found' }</li>
        <li>${integrations || integrations === null ? integrations[1] : 'No data Found'}</li>
        <li>${integrations || integrations === null  ? integrations[0] : 'No data Found'}</li>
    </div>
  </div>
  
   
   
</div>
  
  `;

  // right side of modal
  modalDetailsRight.innerHTML = `
  <div class="card">
    <img src="${image_link[0] || image_link[0] === null ? image_link[0]:'No image found'}" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title">${input_output_examples || input_output_examples === null ? input_output_examples[0].input : 'No input found' }</h5>
      <p class="card-text">${input_output_examples || input_output_examples === null ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!' }</p>
      <button id="accuracy" class="py-1 px-3 btn btn-danger position-absolute top-0 end-0 ${accuracyScore || accuracyScore === null ? 'd-block' : 'd-none' }">${accuracyScore || accuracyScore === null ? accuracyScore : '' }%<span> accuracy</span> </button>
    </div>
  </div>
  `;
  
}

loadTools()