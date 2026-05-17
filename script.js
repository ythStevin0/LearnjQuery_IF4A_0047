$(document).ready(function() {
    const $inputValue = $("#inputTask");
    const $inputDate = $("#inputDate");
    const $btnTambah = $("#btnTambahTodo");
    const $daftarTugas = $("#listTugas");

    // Load data from LocalStorage
    const data = localStorage.getItem("dataTugas");
    if (data) {
        JSON.parse(data).forEach(tugas => {
            tambahElemenTugas(tugas.teks, tugas.tanggal, tugas.selesai);
        });
    }

    function saveData() {
        const semuaTugas = [];
        $("#listTugas li").each(function() {
            const $li = $(this);
            semuaTugas.push({
                teks: $li.find("span").first().html(),
                tanggal: $li.find("small").html().replace("Mulai: ", ""),
                selesai: $li.find("input[type='checkbox']").is(":checked")
            });
        });
        localStorage.setItem("dataTugas", JSON.stringify(semuaTugas));
    }

    function tambahElemenTugas(teks, tanggal, statusSelesai) {
        const $listBaru = $("<li/>");
        if (statusSelesai) $listBaru.addClass("completed");

        const $checkbox = $("<input/>", {
            type: "checkbox",
            checked: statusSelesai
        });

        const $teksTugas = $("<div/>").css({
            "flex": "1",
            "margin-left": "10px"
        });

        const $spanTugas = $("<span/>").html(teks);
        const $spanTanggal = $("<small/>")
            .html(`Mulai: ${tanggal}`)
            .css({
                "display": "block",
                "color": "#cbd5e1"
            });

        $teksTugas.append($spanTugas).append($spanTanggal);

        const $labelStatus = $("<span/>")
            .html(statusSelesai ? "Selesai" : "Progress")
            .addClass("statusBadge")
            .addClass(statusSelesai ? "doneStatus" : "progressStatus");

        $checkbox.on("change", function() {
            if ($(this).is(":checked")) {
                $labelStatus.html("Selesai").removeClass("progressStatus").addClass("doneStatus");
                $listBaru.addClass("completed");
            } else {
                $labelStatus.html("Progress").removeClass("doneStatus").addClass("progressStatus");
                $listBaru.removeClass("completed");
            }
            saveData();
        });

        const $btnEdit = $("<button/>")
            .html(`<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`)
            .addClass("btnEdit")
            .on("click", function() {
                const tBaru = prompt("Edit Tugas:", $spanTugas.html());
                if (tBaru) {
                    $spanTugas.html(tBaru);
                    const dBaru = prompt("Edit Tanggal (YYYY-MM-DD):", $spanTanggal.html().replace("Mulai: ", ""));
                    if (dBaru) $spanTanggal.html(`Mulai: ${dBaru}`);
                    saveData();
                }
            });

        const $btnHapus = $("<button/>")
            .html(`<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`)
            .addClass("btnDelete")
            .on("click", function() {
                if (confirm("Hapus tugas ini?")) {
                    $listBaru.remove();
                    saveData();
                }
            });

        $listBaru.append($checkbox)
                 .append($teksTugas)
                 .append($labelStatus)
                 .append($btnEdit)
                 .append($btnHapus);

        $daftarTugas.append($listBaru);
    }

    $btnTambah.on("click", function() {
        const taskValue = $inputValue.val().trim();
        const dateValue = $inputDate.val();

        if (taskValue === "" || dateValue === "") {
            alert("Nama tugas dan tanggal tidak boleh kosong atau hanya berisi spasi!");
            return;
        }

        tambahElemenTugas(taskValue, dateValue, false);
        saveData();
        
        $inputValue.val("");
        $inputDate.val("");
        $inputValue.focus();
    });

    $inputValue.on("keypress", function(event) {
        if (event.key === "Enter") {
            $btnTambah.click();
        }
    });
});
