const inputValue = document.getElementById("inputTask");
const inputDate = document.getElementById("inputDate");
const btnTambah = document.getElementById("btnTambahTodo");
const daftarTugas = document.getElementById("listTugas");

btnTambah.addEventListener("click", function() {
if (inputValue.value === "" || inputDate.value === "") {
        alert("Input tugas dan tanggal tidak boleh kosong!");
        return;
    }

    const listBaru = document.createElement("li");

    const teksTugas = document.createElement("div");
    teksTugas.innerHTML = `
        <span>${inputValue.value}</span>
        <small>${inputDate.value}</small>
    `;

    listBaru.appendChild(teksTugas);

    const btnHapus = document.createElement("button");
    btnHapus.innerHTML = "Hapus";
    btnHapus.className = "btnDelete";
    
    btnHapus.onclick = function() {
        if(confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
            listBaru.remove();
        }
    };

    listBaru.appendChild(btnHapus);
    daftarTugas.appendChild(listBaru);

    inputValue.value = "";
    inputDate.value = "";
    inputValue.focus();
});
