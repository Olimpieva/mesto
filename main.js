(()=>{"use strict";class e{constructor(e,t,s,{handlerCardClick:r,handlerRemoveCard:i,handlerLikeClick:n}){this._cardTemplate=document.querySelector(t).content,this._userId=e,this._data=s,this._cardId=this._data._id,this.likes=this._data.likes,this._handlerCardClick=r,this._handlerRemoveCard=i,this._handlerLikeClick=n}_getCardTemplate=()=>this._cardTemplate.querySelector(".card").cloneNode(!0);_isCardLiked(){return this.likes.map((e=>e._id)).some((e=>e===this._userId))}_removeCard=()=>{this._handlerRemoveCard(this._cardId,this._card)};_setEventListeners=()=>{this._card.querySelector(".card__like").addEventListener("click",(()=>this._handlerLikeClick(this._cardId,this._isCardLiked()))),this._card.querySelector(".card__remove").addEventListener("click",this._removeCard),this._card.querySelector(".card__image").addEventListener("click",(()=>this._handlerCardClick(this._data)))};renderLikes(){const e=this._card.querySelector(".card__like"),t=this._card.querySelector(".card__like-counter");this._isCardLiked()?e.classList.add("card__like_active"):e.classList.remove("card__like_active"),t.textContent=this.likes.length}generateCard=()=>{this._card=this._getCardTemplate(),this._userId!==this._data.owner._id&&(this._card.querySelector(".card__remove").style.display="none");const e=this._card.querySelector(".card__image"),t=this._card.querySelector(".card__title"),{name:s,link:r}=this._data;return e.src=r,e.alt=s,t.textContent=s,this.renderLikes(),this._setEventListeners(),this._card}}class t{constructor(e){this._popup=document.querySelector(e)}open(){this._popup.classList.add("popup_is-opened"),this._popup.classList.add("popup_animated"),this._popup.addEventListener("click",this._handleOverlayClose),document.addEventListener("keyup",this._handleEscClose)}close(){this._popup.classList.remove("popup_is-opened"),this._popup.removeEventListener("click",this._handleOverlayClose),document.removeEventListener("keyup",this._handleEscClose)}_handleEscClose=e=>{"Escape"===e.code&&this.close()};_handleOverlayClose=e=>{e.target===e.currentTarget&&this.close()};setEventListeners(){this._popup.querySelector(".popup__button_action_close").addEventListener("click",(()=>this.close()))}}class s extends t{constructor(e,t,s){super(e),this._form=this._popup.querySelector(".popup__form"),this._handlerFormSubmit=t,this._inputList=Array.from(this._popup.querySelectorAll(".popup__input")),this._validator=s,this._submitButton=this._popup.querySelector(".popup__button_action_save"),this._submitButtonMessage=this._submitButton.textContent}_getInputValues(){return this._inputValues=this._inputList.reduce(((e,t)=>(e[t.name]=t.value,e)),{}),this._inputValues}setEventListeners(){this._form.addEventListener("submit",(e=>{e.preventDefault();const t=this._getInputValues();this._handlerFormSubmit(t)})),super.setEventListeners()}close=()=>{this._validator.resetForm(),super.close()};renderLoading(e){this._submitButton.textContent=e?"Сохранение...":this._submitButtonMessage}}class r{constructor(e,t){this._formElement=t,this._submitButton=this._formElement.querySelector(e.submitButtonSelector),this._inputSelector=e.inputSelector,this._inputErrorClass=e.inputErrorClass,this._inputErrorMessageClass=e.inputErrorMessageClass,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector))}_showInputErrorMessage=(e,t)=>{const s=this._formElement.querySelector(`#${e.id}-error`);s.textContent=t,s.classList.add(this._inputErrorMessageClass),e.classList.add(this._inputErrorClass)};_hideInputErrorMessage=e=>{const t=this._formElement.querySelector(`#${e.id}-error`);t.classList.remove(this._inputErrorMessageClass),e.classList.remove(this._inputErrorClass),t.textContent=""};_checkInputValidity=e=>{if(e.validity.valid)this._hideInputErrorMessage(e);else{const t=e.validationMessage;this._showInputErrorMessage(e,t)}};_hasInvalidInput=()=>this._inputList.some((e=>!e.validity.valid));_toggleButtonState=()=>{this._submitButton.disabled=this._hasInvalidInput()};enableValidation=()=>{this._toggleButtonState(),this._inputList.forEach((e=>e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))))};resetForm=()=>{this._inputList.forEach((e=>this._hideInputErrorMessage(e))),this._formElement.reset(),this._submitButton.disabled=!0}}const i={inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_invalid",inputErrorMessageClass:"popup__input-error_active"},n=document.querySelector(".popup__form-profile"),a=document.querySelector(".popup__form-card"),o=document.querySelector(".popup__form-avatar"),d=document.querySelector(".profile__button_action_edit"),l=document.querySelector(".profile__button_action_add"),u=document.querySelector(".profile__avatar-overlay"),c=new class{constructor(e){this._url=e.baseUrl,this._headers=e.headers}_sendRequest(e,t){return fetch(`${this._url}/${e}`,t).then((e=>e.ok?e.json():Promise.reject(`Произошла ошибка: ${e.status}`)))}getInitialCards(){return this._sendRequest("cards",{headers:this._headers})}getUserInfo(){return this._sendRequest("users/me",{headers:this._headers})}updateUserInfo(e){return this._sendRequest("users/me",{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})})}updateAvatar(e){return this._sendRequest("users/me/avatar",{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})})}addCard(e){return this._sendRequest("cards",{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})})}removeCard(e){return this._sendRequest(`cards/${e}`,{method:"DELETE",headers:this._headers})}likeCard(e){return this._sendRequest(`cards/likes/${e}`,{method:"PUT",headers:this._headers})}dislikeCard(e){return this._sendRequest(`cards/likes/${e}`,{method:"DELETE",headers:this._headers})}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-27",headers:{authorization:"e0a0481d-9fe7-4aea-8a7b-5b74aae0ea67","Content-Type":"application/json"}}),h=new class{constructor(e,t){this._renderer=e,this._container=document.querySelector(t)}addItem=e=>{this._container.prepend(e)};renderItems(e){e.forEach((e=>this._renderer(e)))}}((e=>{const t=y(e);h.addItem(t)}),".cards"),_=new class{constructor({nameSelector:e,captionSelector:t,avatarSelector:s}){this._userName=document.querySelector(e),this._userCaption=document.querySelector(t),this._userAvatar=document.querySelector(s)}get userInfo(){return{name:this._userName.textContent,about:this._userCaption.textContent,avatar:this._userAvatar.src}}set userInfo({name:e,about:t,avatar:s}){e&&(this._userName.textContent=e),t&&(this._userCaption.textContent=t),s&&(this._userAvatar.src=s)}}({nameSelector:".profile__info-name",captionSelector:".profile__info-caption",avatarSelector:".profile__avatar"});let p;c.getUserInfo().then((e=>{_.userInfo=e,p=e._id,c.getInitialCards().then((e=>{h.renderItems(e)})).catch((e=>console.log(`Произошла ошибка: ${e}`)))})).catch((e=>console.log(`Произошла ошибка: ${e}`)));const m=new r(i,a),v=new r(i,n),C=new r(i,o);v.enableValidation(),m.enableValidation(),C.enableValidation();const f=new class extends t{constructor(e,t){super(e),this._form=this._popup.querySelector(".popup__form"),this._handlerFormSubmit=t}setEventListeners(){this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handlerFormSubmit(this._transformData,this._transformElement),this.close()})),super.setEventListeners()}open(e,t){super.open(),this._transformData=e,this._transformElement=t}}(".popup-confirmation",((e,t)=>{c.removeCard(e),t.remove()}));f.setEventListeners();const E=new class extends t{constructor(e){super(e),this._fullImage=this._popup.querySelector(".popup-image__image"),this._fullImageTitle=this._popup.querySelector(".popup-image__title")}open({name:e,link:t}){this._fullImage.src=t,this._fullImage.alt=e,this._fullImageTitle.textContent=e,super.open()}}(".popup-image");E.setEventListeners();const g=new s(".popup-avatar",(function(e){this.renderLoading(!0),c.updateAvatar(e.avatar).then((()=>_.userInfo=e)).catch((e=>console.log(`Произошла ошибка: ${e}`))).finally((()=>{this.renderLoading(!1),this.close()}))}),C);g.setEventListeners(),u.addEventListener("click",(()=>g.open()));const L=new s(".popup-profile",(function(e){this.renderLoading(!0),c.updateUserInfo(e).then((e=>{_.userInfo=e})).catch((e=>console.log(`Произошла ошибка: ${e}`))).finally((()=>{this.renderLoading(!1),this.close()}))}),v);L.setEventListeners(),d.addEventListener("click",(()=>{n.elements.name.value=_.userInfo.name,n.elements.about.value=_.userInfo.about,L.open()}));const k=new s(".popup-card",(function(e){this.renderLoading(!0),c.addCard(e).then((e=>{const t=y(e);h.addItem(t)})).catch((e=>console.log(`Произошла ошибка: ${e}`))).finally((()=>{this.renderLoading(!1),this.close()}))}),m);function y(t){return new e(p,"#card-template",t,{handlerCardClick:e=>{E.open(e)},handlerRemoveCard:(e,t)=>{f.open(e,t)},handlerLikeClick:function(e,t){t?c.dislikeCard(e).then((e=>{this.likes=e.likes,this.renderLikes()})).catch((e=>console.log(`Произошла ошибка: ${e}`))):c.likeCard(e).then((e=>{this.likes=e.likes,this.renderLikes()})).catch((e=>console.log(`Произошла ошибка: ${e}`)))}}).generateCard()}k.setEventListeners(),l.addEventListener("click",(()=>k.open()))})();