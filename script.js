const inputValue = document.getElementById("inputTask");
const inputDate = document.getElementById("inputDate");
const btnTambah = document.getElementById("btnTambahTodo");
const daftarTugas = document.getElementById("listTugas");

window.onload = function() {
    const data = localStorage.getItem("dataTugas");
    if (data) {
        JSON.parse(data).forEach(tugas => {
            tambahElemenTugas(tugas.teks, tugas.tanggal, tugas.selesai);
        });
    }
};

function saveData() {
    const semuaTugas = [];
    document.querySelectorAll("#listTugas li").forEach(li => {
        semuaTugas.push({
            teks: li.querySelector("span").innerHTML,
            tanggal: li.querySelector("small").innerHTML.replace("Mulai: ", ""),
            selesai: li.querySelector("input[type='checkbox']").checked
        });
    });
    localStorage.setItem("dataTugas", JSON.stringify(semuaTugas));
}

function tambahElemenTugas(teks, tanggal, statusSelesai) {
    const listBaru = document.createElement("li");
    if (statusSelesai) listBaru.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = statusSelesai;
    listBaru.appendChild(checkbox);

    const teksTugas = document.createElement("div");
    teksTugas.style.flex = "1";
    teksTugas.style.marginLeft = "10px";

    const spanTugas = document.createElement("span");
    spanTugas.innerHTML = teks;

    const spanTanggal = document.createElement("small");
    spanTanggal.innerHTML = `Mulai: ${tanggal}`;
    spanTanggal.style.display = "block";
    spanTanggal.style.color = "#cbd5e1";

    teksTugas.appendChild(spanTugas);
    teksTugas.appendChild(spanTanggal);
    listBaru.appendChild(teksTugas);

    const labelStatus = document.createElement("span");
    labelStatus.innerHTML = statusSelesai ? "Selesai" : "Progress";
    labelStatus.className = statusSelesai ? "statusBadge doneStatus" : "statusBadge progressStatus";
    listBaru.appendChild(labelStatus);

    checkbox.addEventListener("change", function() {
        if (this.checked) {
            labelStatus.innerHTML = "Selesai";
            labelStatus.className = "statusBadge doneStatus";
            listBaru.classList.add("completed");
        } else {
            labelStatus.innerHTML = "Progress";
            labelStatus.className = "statusBadge progressStatus";
            listBaru.classList.remove("completed");
        }
        saveData();
    });

    const btnEdit = document.createElement("button");
    btnEdit.innerHTML = `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`;
    btnEdit.className = "btnEdit";
    btnEdit.onclick = function() {
        const tBaru = prompt("Edit Tugas:", spanTugas.innerHTML);
        if (tBaru) {
            spanTugas.innerHTML = tBaru;
            const dBaru = prompt("Edit Tanggal (YYYY-MM-DD):", spanTanggal.innerHTML.replace("Mulai: ", ""));
            if (dBaru) spanTanggal.innerHTML = `Mulai: ${dBaru}`;
            saveData();
        }
    };

    const btnHapus = document.createElement("button");
    btnHapus.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;
    btnHapus.className = "btnDelete";
    btnHapus.onclick = function() {
        if (confirm("Hapus tugas ini?")) {
            listBaru.remove();
            saveData();
        }
    };

    listBaru.appendChild(btnEdit);
    listBaru.appendChild(btnHapus);
    daftarTugas.appendChild(listBaru);
}

btnTambah.addEventListener("click", function() {
    if (inputValue.value === "" || inputDate.value === "") {
        alert("Input tidak boleh kosong!");
        return;
    }
    tambahElemenTugas(inputValue.value, inputDate.value, false);
    saveData();
    
    inputValue.value = "";
    inputDate.value = "";
    inputValue.focus();
});
