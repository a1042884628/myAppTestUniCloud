
const getters = {
  userId:state => state.user.userId,
  token:state => state.user.token,
  salerId:state => state.user.salerId,
  openId:state => state.user.openId,
  nickname:state => state.user.nickname,
  levelname:state => state.user.levelname,
  realName:state => state.user.realName,
  mobile:state => state.user.mobile,
  guid:state => state.user.guid,
  avatar:state => state.user.avatar,
  reco_project_list:state => state.user.reco_project_list,
  sale_project_list:state => state.user.sale_project_list,
  money:state => state.user.money,
  score:state => state.user.score,
  un_read_num:state=>state.user.un_read_num,
  saler_un_read_num:state=>state.user.saler_un_read_num,
  reco_client_num:state => state.user.reco_client_num,
  pageCur:state=> state.app.pageCur,
  setting:state=> state.app.setting,
  uuidSetting:state=>state.app.uuidSetting,

}
export default getters