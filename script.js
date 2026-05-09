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
    btnEdit.innerHTML = `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`;
    btnEdit.className = "btnEdit";
    btnEdit.title = "Edit Tugas";

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
    btnHapus.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;
    btnHapus.className = "btnDelete";
    btnHapus.title = "Hapus Tugas";
    
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
