// here we fetch our target url & get our necessary tools
const loadTools = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayTools(data.data.tools))
}
// declare a function for display tools details
const displayTools = (tools) =>{
    
    const seeMoreBtn = document.getElementById('seeMoreBtn');

    if(tools.length > 6){
      tools = tools.slice(0, 6);
      seeMoreBtn.classList.remove('d-none');
    }
    else{
      seeMoreBtn.classList.add('d-none');
    
    }
    document.getElementById('moreToolsBtn').addEventListener('click', function(){
      tools = tools.slice(6, 12);
      })
  
    const toolsContainer = document.getElementById('toolsContainer');
    

    tools.forEach(tool => {
        const {features, image, name, published_in, id} = tool;
        const toolDiv = document.createElement('div')
        toolDiv.classList.add('col')
        toolDiv.innerHTML = `
        <div class="card h-100">
        <img src="${image}" class="card-img-top" alt="">
        <div class="card-body">
          <h4 class="card-title">features</h4>
          <h6 class="card-text text-muted">1. ${features[0] ? features[0] : 'No Features'}</h6>
          <h6 class="card-text text-muted">2. ${features[1] ? features[1] : 'No Features'}</h6>
          <h6 class="card-text text-muted">3. ${features[2] ? features[2] : 'No Features'}</h6>
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
  
 }
const loadToolsDetails =  id =>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data =>displayToolsDetails(data.data))
  }

const displayToolsDetails = item =>{
  const { image_link ,description, features, integrations, pricing, accuracy, input_output_examples} = item;
  console.log(input_output_examples)
  const modalDetailsLeft = document.getElementById('modalBodyLeft');
  const modalDetailsRight = document.getElementById('modalBodyRight')
  modalDetailsLeft.innerHTML = `
  <div class="card bg-danger-subtle p-2">
    <p class="fw-bold"> ${description}</p>

    <p class="fw-bold"> ${pricing[0].price} <span>${pricing[0].plan}</span></p>
    <p class="fw-bold"> ${pricing[1].price} <span>${pricing[1].plan}</span></p>
    <p class="fw-bold"> ${pricing[2].price} <span>${pricing[2].plan}</span></p>

    <p>${features['1'].feature_name}</p>
    <p>${features['2'].feature_name}</p>
    <p>${features['3'].feature_name}</p>

    <p>${integrations[0]}</p>
    <p>${integrations[1]}</p>
    <p>${integrations[2]}</p>
</div>
  
  `;
  modalDetailsRight.innerHTML = `
  <div class="card">
    <img src="${image_link[0]}" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
  </div>
  `;
  
}

loadTools()