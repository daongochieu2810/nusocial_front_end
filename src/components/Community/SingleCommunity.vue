<template>
  <div>
    <transition @before-enter="enterStart" appear>
      <div id="row1">
        <Posts
          id="column12"
          style="margin-left: 7vw;width: 45.5vw"
          :allPosts="allPosts"
          title="All Posts"
        />
        <Posts
          id="column11"
          style="margin-left: 10px;width: 45.5vw"
          :allPosts="yourPosts"
          title="Your Posts"
        />
      </div>
    </transition>
    <transition @before-enter="enterStart" appear>
      <Announcements style="margin-right: 20px" :allPosts="annoucementPost" :commData="commData" />
    </transition>
    <b-dropdown
      id="dropdown-dropup"
      dropup
      text="All members"
      variant="primary"
      class="m-2"
      style="bottom: 10px;right: 10px;position: fixed"
    >
      <b-dropdown-item
        v-for="member in allMembers.filter(mem => !this.commData.allAdminsID.includes(mem.uid))"
        :key="member.uid"
      >
        <b-button v-b-modal.modal-1>{{member.name}}</b-button>
        <b-modal id="modal-1" :title="member.name">
          <div>
            <img
              :src="member.profilePicturePath"
              alt="image"
              style="max-height: 500px;max-width: 400px"
            />
            <p style="margin-top: 10px">About: {{member.about}}</p>
            <p>Course: {{member.courseOfStudy}}</p>
            <p>Member of {{member.communities.length}} communities</p>
            <p>Has {{member.buddies.length}} buddies</p>
            <p>Taking {{member.modules.length}} modules this semester</p>
            <b-button variant="danger" @click="removeMember(member.uid)">Remove from this community</b-button>
          </div>
        </b-modal>
      </b-dropdown-item>
    </b-dropdown>
    <Loading v-if="isLoading" style="position: fixed;bottom: 50vh;right: 50vw;" />
  </div>
</template>

<script>
import Announcements from "./Announcements";
import Loading from "../Common/Loading";
import Posts from "./Posts";
const fb = require("../../backend.js");
export default {
  components: {
    Announcements,
    Posts,
    Loading
  },
  data() {
    return {
      commID: "",
      commData: {
        name: ""
      },
      allPosts: [],
      allMembers: [],
      yourPosts: [],
      annoucementPost: [],
      isLoading: false
    };
  },
  methods: {
    removeMember(id) {
      this.removeCommfromMember(id).then(() => {
        this.removeMemfromComm(id);
      });
    },
    async removeCommfromMember(id) {
      //console.log(id);
      await fb.userCollection
        .doc(id)
        .update({ communities: fb.FieldValue.arrayRemove(this.commID) });
    },
    async removeMemfromComm(id) {
      await fb.communityCollection
        .doc(this.commID)
        .update({ allMembersID: fb.FieldValue.arrayRemove(id) })
        .then(() => {
          this.allMembers = this.allMembers.filter(mem => mem.uid != id);
        });
    },
    enterStart: function(el) {
      el.classList.add("testing-enter");
    },
    async getUsers() {
      this.isLoading = true;
      await fb.userCollection
        .where("uid", "in", this.commData.allMembersID)
        .get()
        .then(res => {
          res.forEach(doc => {
            this.allMembers.push(doc.data());
          });
          this.isLoading = false;
        });
    },
    async getPosts() {
      this.isLoading = true;
      var owner = null;
      var user = null;
      await fb.communityCollection
        .doc(this.commID)
        .collection("posts")
        .orderBy("timeStamp", "desc")
        .onSnapshot(query => {
          this.isLoading = false;
          query.docChanges().forEach(change => {
            var doc = change.doc;
            //this.allPosts.push(doc.data());
            var data = doc.data();
            if (change.type == "added") {
              data.id = doc.id;
              if (
                data.ownerUid == this.$store.state.userProfile.uid &&
                data.postType != "Announcement"
              ) {
                user = this.$store.state.userProfile;
                this.yourPosts.push({ post: data, owner: user });
              } else if (data.postType == "Announcement") {
                owner = this.allMembers.find(user => user.uid == data.ownerUid);
                this.annoucementPost.push({ post: data, owner: owner });
              } else if (data.ownerUid != this.$store.state.userProfile.uid) {
                owner = this.allMembers.find(user => user.uid == data.ownerUid);
                this.allPosts.push({ post: data, owner: owner });
              }
            } else if (change.type == "modified") {
              data.id = doc.id;
              if (
                data.ownerUid == this.$store.state.userProfile.uid &&
                data.postType != "Announcement"
              ) {
                user = this.$store.state.userProfile;
                for (let post of this.yourPosts) {
                  if (data.id == post.post.id) {
                    post.post = data;
                    break;
                  }
                }
                //this.yourPosts.push({ post: data, owner: user });
              } else if (data.postType == "Announcement") {
                owner = this.allMembers.find(user => user.uid == data.ownerUid);
                //this.annoucementPost.push({ post: data, owner: owner });
                for (let post of this.annoucementPost) {
                  if (data.id == post.post.id) {
                    post.post = data;
                    break;
                  }
                }
              } else if (data.ownerUid != this.$store.state.userProfile.uid) {
                owner = this.allMembers.find(user => user.uid == data.ownerUid);
                //this.allPosts.push({ post: data, owner: owner });
                for (let post of this.allPosts) {
                  if (data.id == post.post.id) {
                    post.post = data;
                    break;
                  }
                }
              }
            } else if (change.type == "removed") {
              //console.log("removing posts");
              data.id = doc.id;
              if (
                data.ownerUid == this.$store.state.userProfile.uid &&
                data.postType != "Announcement"
              ) {
                this.yourPosts = this.yourPosts.filter(
                  post => post.post.id != data.id
                );
              } else if (data.postType == "Announcement") {
                this.annoucementPost = this.annoucementPost.filter(
                  post => post.post.id != data.id
                );
              } else if (data.ownerUid != this.$store.state.userProfile.uid) {
                this.allPosts = this.allPosts.filter(
                  post => post.post.id != data.id
                );
              }
            }
          });
        });
    }
  },
  mounted() {
    //console.log(this.commData);
    this.commID = this.$route.params.comm_id;
    this.commData = this.$store.state.communities.find(
      comm => comm.id == this.commID
    );
    //console.log(this.commData);
    this.getUsers().then(() => {
      this.getPosts();
    });
  },
  computed: {}
};
</script>
<style scoped>
#row1,
#row2 {
  display: flex;
  flex-direction: row;
}

#column11,
#column12 {
  display: flex;
  flex-direction: column;
}
.testing-enter {
  animation: enter 0.5s;
}
@keyframes enter {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>