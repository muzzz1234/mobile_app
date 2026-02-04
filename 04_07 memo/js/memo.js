//
window.addEventListener("DOMContentLoaded",
    function () {

        // 1.localStorage
        if (typeof localStorage === "undefined") {
            window.alert("localStorage");
            return;
        } else {
            viewStorage();  //localStorageからのデータ取得
            saveLocalStorage(); //2. localStrageへのほぞん
            dellocalStorage();  //3.localStorageから１削除
            selectTable(); //5.データ選択
            allClearLocalStorage();
        }
    }, false

);


// 2.localStorage
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            //
            if (key == "" || value == "") {
                window.alert("Key, Memoは入力必須です。");
                return;
            } else {
                let w_confirm = window.confirm("localStorageに\n 「" + key + " " + value + "」を保存しますか？\n");
                //確認　ダイアログ「ok」
                if (w_confirm === true) {
                    localStorage.setItem(key, value);
                    viewStorage(); //localStorage
                    let w_msg = "Localstorage" + key + " " + value + "を保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
};

//3.localStorageから１削除
function dellocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_sel = "0";
            w_sel = selectCheckbox();

            if (w_sel === "1") {
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                let w_confirm = window.confirm("localStorageから\n 「" + key + " " + value + "」を削除しますか?");
                if (w_confirm === true) {
                    localStorage.removeItem(key);
                    viewStorage(); //localStorage
                    let w_msg = "localStorageから 「" + key + " " + value + "」を削除しました";
                    window.alert(w_msg);
                    document.getElementById("textkey").value = "";
                    document.getElementById("textmemo").value = "";
                }

            }
        }, false
    );

};

//4.localStorage
function allClearLocalStorage() {
    const allclear = document.getElementById("allClear");
    allclear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = window.confirm("LocalStorageからデータをすべて削除しますか?");
            if (w_confirm === true) {
                localStorage.clear();
                viewStorage(); //localstorage
                let w_msg = "localStorageからデータをすべて削除しました。";
                window.alert(w_msg);
                document.getElementById("textkey").value = "";
                document.getElementById("textMemo").value = "";

            }

        }, false
    );
};

//5.データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckbox(); //テーブルからデータ選択
        }, false
    );
};

//テーブルからデータ選択
function selectCheckbox() {
    let w_sel = "0"; //選択
    let w_cnt = 0; //選択されているチェックボックス
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = ""; //work
    let w_textmemo = ""; //work

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textmemo = table1.rows[i + 1].cells[2].firstChild.data;
                // return w_sel = "1";
            }
            w_cnt++ //選択されているチェックボックスの
        }
    }

    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textmemo;
    if (w_cnt === 1) {
        return w_sel = "1";
    } else {
        window.alert("1つ選択 してください。");
    }

};

//localStorageからのデータ取得とテーブル表示
function viewStorage() {

    const list = document.getElementById("list");
    //html
    while (list.rows[0]) list.deleteRow(0);

    //localStorage
    for (let i = 0; i < localStorage.length; i++) {
        let w_Key = localStorage.key(i);

        //localStorage
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);


        td1.innerHTML = "<input name= 'chkbox1' type= 'checkbox' >";
        td2.innerHTML = w_Key;
        td3.innerHTML = localStorage.getItem(w_Key)

    }

    //jQueryのplugin tablesorter
    //sortlist:
    $("#table1").tablesorter({      //tablesort add
        sortList: [[1, 0]]           //tablesort add
    });                             //tablesort add

    $("#table1").trigger("update"); //tablesort add

}






