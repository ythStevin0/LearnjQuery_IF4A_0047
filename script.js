const inputValue = document.getElementById("inputTask");
const inputDate = document.getElementById("inputDate");
const btnTambah = document.getElementById("btnTambahTodo");
const daftarTugas = document.getElementById("listTugas");

btnTambah.addEventListener("click", function() {

    const listBaru = document.createElement("li");

    const teksTugas = document.createElement("div");
    teksTugas.innerHTML = `
        <span>${inputValue.value}</span>
        <small>${inputDate.value}</small>
    `;

    listBaru.appendChild(teksTugas);
    daftarTugas.appendChild(listBaru);

    inputValue.value = "";
    inputDate.value = "";
    inputValue.focus();
});
