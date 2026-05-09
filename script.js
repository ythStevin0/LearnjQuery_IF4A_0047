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
    teksTugas.style.flex = "1";

    const spanTugas = document.createElement("span");
    spanTugas.innerHTML = inputValue.value;

    const spanTanggal = document.createElement("small");
    spanTanggal.innerHTML = ` (${inputDate.value})`;
    spanTanggal.style.display = "block";
    spanTanggal.style.color = "#cbd5e1";

    teksTugas.appendChild(spanTugas);
    teksTugas.appendChild(spanTanggal);
    listBaru.appendChild(teksTugas);

    const btnEdit = document.createElement("button");
    btnEdit.innerHTML = "Edit";
    btnEdit.className = "btnEdit";

    btnEdit.onclick = function() {
        const tugasBaru = prompt("Edit Tugas:", spanTugas.innerHTML);
        if (tugasBaru !== null && tugasBaru !== "") {
            spanTugas.innerHTML = tugasBaru;
            const tanggalBaru = prompt("Edit Tanggal (YYYY-MM-DD):", spanTanggal.innerHTML.replace(/[() ]/g, ""));
            if (tanggalBaru !== null && tanggalBaru !== "") {
                spanTanggal.innerHTML = ` (${tanggalBaru})`;
            }
        }
    };

    const btnHapus = document.createElement("button");
    btnHapus.innerHTML = "Hapus";
    btnHapus.className = "btnDelete";
    
    btnHapus.onclick = function() {
        if(confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
            listBaru.remove();
        }
    };

    listBaru.appendChild(btnEdit);
    listBaru.appendChild(btnHapus);
    daftarTugas.appendChild(listBaru);

    inputValue.value = "";
    inputDate.value = "";
    inputValue.focus();
});
