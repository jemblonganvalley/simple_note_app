
// function untuk handle submit
function handleSubmit(event) {

  // stop form untuk merefresh page
  event.preventDefault();

  // kita tangap input user
  let userInput = event.target.note.value;
  let uuid = Date.now(); // 981723969123

  // membuat waktu dan tanggal
  let noteDate = new Date();
  let tanggal = noteDate.getDate();
  let bulan = noteDate.getMonth();
  let tahun = noteDate.getFullYear();
  let jam = noteDate.getHours();
  let menit = noteDate.getMinutes();

  // generate waktu
  let waktu = `${tanggal}/${bulan}/${tahun} ${jam}:${menit}`;

  // menangkap prev data dari local storage
  let _note = localStorage.getItem("_note")  /// "[]" 

  // check apakah sudah ada key _note
  if(!_note){
    checkLocalStorage() /// membuat data localStorage
    _note = localStorage.getItem("_note")
  }

  // merubah data string dari localstorage menjadi array dalam javascript
  _note = JSON.parse(_note) // "[]" => []

  // push data ke dalam array _note
  _note.push({
    id : uuid,
    notes : userInput,
    date : waktu
  })

  // save kembali ke localstorage
  localStorage.setItem("_note", JSON.stringify(_note) )

  // clear textarea
  event.target.note.value = ""

  // mereload page
  window.location.reload()

}

// function untuk mengecek / membuat local storage _note
function checkLocalStorage(){

  // buat variable yang akan menampung local storage dengan nama _note
  let _note = localStorage.getItem("_note")

  if(!_note){
    localStorage.setItem("_note", "[]")
  }

  renderData()

}

// function untuk merender data dari localstorage ke halaman html
function renderData(){

  // tangkap elemen card_container
  let card_container = document.getElementById("card_container")

  // tangkap data _notes dari localstorage
  let _note = localStorage.getItem("_note") // "[]"
  _note = JSON.parse(_note).reverse()   // "[]" => [] js array

  _note.forEach(function(item){
      card_container.innerHTML += `
      
          <div class="card">
              <p class="card_content">
                  ${item.notes}
              </p>

              <small class="card_date">
                  ${item.date}
              </small>

              <button class="card_btn">
                  <i class="material-icons">
                      delete
                  </i>
              </button>
          </div>
      
      `
  })



}


