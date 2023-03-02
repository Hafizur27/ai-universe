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
          <button onclick="loadToolsDetails('${id}')" class="py-1 px-3 btn bg-danger-subtle text-danger"><i class="fa-solid fa-arrow-right"></i></button>
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
  const {description, features, integrations, pricing, accuracy, input_output_examples} = item;
  
}

loadTools()