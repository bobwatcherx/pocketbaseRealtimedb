<script >
  import PocketBase from 'pocketbase';
const client = new PocketBase('http://localhost:8090');
let resultdata = []
async function loginuser(){
  const authData = await client.Users.authViaEmail("realtimeuser@gmail.com", "admin12345");
  if(authData){
    getallrecord()
  }
}
loginuser()
async function getallrecord(){
  const resultList = await client.Records.getList("realtimedb", 1, 50, {
    filter: "created >= '2022-01-01 00:00:00'",
});
  resultdata = resultList.items
}
// IF DETECT DATA CHANGED RUN FUNCTION AGAIN
client.Realtime.subscribe("realtimedb", function (e) {
    console.log(e.record);
    // RUN AGAIN
    getallrecord()
});

</script>

{#each resultdata as r}
  <li>
    {r.name} -{r.age}
    <button
    on:click={async()=>{
      let prompname = prompt("user",r.name)
      let prompage = prompt("user",r.age)
      const record = await client.Records.update("realtimedb",r.id, {
    name: prompname,
    age : prompage
});
    }}
    >
      update
    </button>
  </li>
{/each}