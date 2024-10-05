


function build_new_filter() {
    
    var html = `

<div class="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="formModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="formModalLabel">Awesome Form</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form id="formAwesome">
        <div class="modal-body">
          <div class="form-group row">
            <label for="firstName" class="col-sm-6 col-form-label">
              First name
            </label>
            <div class="col-sm-6">
              <input type="text" class="form-control" id="firstName" placeholder="John" required>
            </div>
          </div>
          <div class="form-group row">
            <label for="lastName" class="col-sm-6 col-form-label">
              Last name
            </label>
            <div class="col-sm-6">
              <input type="text" class="form-control" id="lastName" placeholder="Doe" required>
            </div>
          </div>
          <div class="form-group row">
            <label for="email" class="col-sm-6 col-form-label">
              E-mail address
            </label>
            <div class="col-sm-6">
              <input type="email" class="form-control" id="email" placeholder="john.doe@email.com" required>
            </div>
          </div>
          <div class="form-group row">
            <label for="awesomeness" class="col-sm-6 col-form-label">
              Is this an awesome form?</label>
            <div class="col-sm-6">
              <select class="form-control" id="awesomeness">
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="awesomeCheck" required>
            <label class="form-check-label" for="awesomeCheck">
              I confirm that I am an awesome person.
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>

`;

var el = document.getElementById('new-filter');
    el.innerHTML = html;
   
}

function show_new_menu() {
    
    build_new_filter();
    
}