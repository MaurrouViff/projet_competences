// import supabase from "../supabaseClient.ts";
//
//
// export async function getSession() {
//     const {data, error} = await supabase.auth.getSession()
//     if (error) {
//         console.log(error);
//     }
// }
//
// export async function test(userId: number) {
//     let {data: salarie, error} = await supabase
//         .from('salarie')
//         .select('*')
//     if (error) {
//         throw error;
//     }
//     const selectSalarie = salarie?.find(salarieUUID => salarieUUID.uuid === userId)
//     console.log(selectSalarie)
// }
