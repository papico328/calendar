// html用の変数
var $window = $(window),
    $year = $('#js-year'),
    $month = $('#js-month'),
    $day = $('#js-day'),
    $tbody = $('#js-calendar-body'),
    $thead = $('#js-calendar-head');

// 今日の年月日と曜日を取得する
var today = new Date()
    date = today.getDate(),
// console.log(today);
// console.log(date);
    currentYear = today.getFullYear(),
    currentMonth = today.getMonth(),
    dayOfWeekStrJP = [ "日", "月", "火", "水", "木", "金", "土" ] ,
    currentDay = dayOfWeekStrJP[today.getDay()];

// 今年、今月のカレンダーを表示する
$window.on('load',function(){
  calendarTitle(currentYear, currentMonth);
  calendarHeading();
  calendarBody(currentYear, currentMonth);
});
// 二つの引数を変えるとその月日のカレンダーが取得できる
// （例：currentYear = 1991,currentMonth =3)

// カレンダーの年と月
function calendarTitle(year, month){
  $year.text(year);
  // console.log($year.text(year));
  $month.text(month + 1);
}

// 前月のカレンダー
document.getElementById("minus").onclick = function countDown(){
  if(currentMonth == 0){
    currentYear = currentYear - 1;
    currentMonth += 11;
    // 月は0から始まるので1月は0,12月は11
    calendarTitle(currentYear, currentMonth);
    calendarBody(currentYear,currentMonth);
  }
  else{
    currentMonth = currentMonth - 1;
    calendarTitle(currentYear, currentMonth);
    calendarBody(currentYear,currentMonth);
  }
  console.log(currentMonth);
};

// 翌月のカレンダー
document.getElementById("plus").onclick = function countUp(){
  console.log(currentMonth);
  if(currentMonth == 11){
    currentYear =  currentYear + 1;
    currentMonth -= 11;
    calendarTitle(currentYear, currentMonth);
    calendarBody(currentYear,currentMonth);
  }
  else{
    currentMonth = currentMonth + 1;
    calendarTitle(currentYear, currentMonth);
    calendarBody(currentYear,currentMonth);
  }
  console.log(currentMonth);
  // ここに#buttonをクリックしたら発生させる処理を記述する
};

// カレンダーの曜日
function calendarHeading() {
    var th = '';
    var dayOfWeekStrJP = [ '<span style="color:red">日</span>', "月", "火", "水", "木", "金", '<span style="color:blue;">土</span>' ] ;
    for(var col = 0; col < 7 ; col++) {
            var day = dayOfWeekStrJP[col]
            // console.log(`"${dayOfWeekStrJP[col]}"`);
            th += `<th>${day}</th>`;
            console.log(th);
    }
  $thead.html(`<tr>${th}</tr>`);
}

// function calendarHeading() {
//   var dayOfWeekStrJP = [ "日", "月", "火", "水", "木", "金", "土" ] ;
//   var th = [];　配列を生成
//   for(var col = 0; col < 7 ; col++) {
//     var day = dayOfWeekStrJP[col];
//     th.push(`<th>${day}</th>`);　配列に代入
//     console.log(th);
//   }
//   console.log(th);
//   console.log(th.join(''));
// $thead.html(`<tr>${th.join('')}</tr>`);　配列を文字列にする
// }
// ぴよちゃん

// 今日を赤くする関数
function getToday(year,month,textTd){
  var todayYMFlag = ((today.getFullYear() === year) && (today.getMonth() === month)) ? true : false; // 本日の年と月が表示されるカレンダーと同じか判定
  var addClass = '';
  if (todayYMFlag && (textTd === today.getDate())) {
    addClass = 'is-today';
  }
  return addClass;
}

var day = new Date("2020/6/25")
console.log(day.getDay());

// 土日を赤と青にする関数
function getDay(currentYear,currentMonth,textTd){
  var calendarDay = new Date(`${currentYear}/${currentMonth + 1}/${textTd}`);
  console.log(calendarDay);
  var sundayFlag = (calendarDay.getDay() === 0) ? true : false;
  var suturdayFlag = (calendarDay.getDay() === 6) ? true : false;
  var suturdayFlag
  var addClass='';
  if (sundayFlag) {
    addClass = 'is-sunday';
  }
  else if(suturdayFlag) {
    addClass = 'is-suturday';
  }
  return addClass;
}

// 当月の日にちを生成する関数
function calendarBody(year, month){
  var startDate = new Date(year, month, 1); // その月の最初の日の情報
  var endDate  = new Date(year, month + 1 , 0); // その月の最後の日の情報
  var startDay = startDate.getDay();// その月の最初の日の曜日を取得
  var endDay = endDate.getDate();// その月の最後の日の曜日を取得
  var textSkip = true; // 日にちを埋める用のフラグ
  var textDate = 1; // 日付(これがカウントアップされます)
  var tableBody =''; // テーブルのHTMLを格納する変数
  for (var row = 0; row < 6; row++){
    var tr = '<tr>';
    for (var col = 0; col < 7; col++) {
      if (row === 0 && startDay === col){
        textSkip = false;
      }
      if (textDate > endDay) {
        textSkip = true;
      }
      // var addClass = (todayYMFlag && (textDate === today.getDate())) ? 'is-today' : '';
      var textTd = textSkip ? ' ' : textDate++;
      var todayClass = getToday(year,month,textTd);
      var dayClass = getDay(currentYear,currentMonth,textTd);
      var td = '<td class="'+todayClass+' '+dayClass+'"><span class="text">'+textTd+'</span></td>';
      // `<td class="${addClass}">${textTd}</td>`;
      tr += td;
    }
    tr += '</tr>';
    tableBody += tr;
  }
  $tbody.html(tableBody);
}

// 前月の日にちを生成する関数
