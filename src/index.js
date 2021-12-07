let log = `[INFO ][2021-11-28 16:08:07][info-api-center]72782 970bb699-368a-5260-a489-aad069942be8 0 "HTTP/1.1" "GET" info_api_center_v1 "/info-api-center/center-apis" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36" 200 19 941 202.10.23.14`
log = `[INFO][11-28 16:08][info-api] 72782`


function parseLog (str) {
  const xstate = [
    () => { // state => 0
      console.log(1)
    },
    () => { // state => 1

    }
  ]

  for (let i = 0; i < str.length - 1; i++) {
    xstate(0)
  }
  
  // return str
}

console.log(parseLog(log))