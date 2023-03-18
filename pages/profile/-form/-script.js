export default {
  name: 'FormCard',
  props: ['categories', 'item'],
  emits: ['search-query'],
  data() {
    return {
      form: {
        name: null,
        company_name: null,
        tax_card_num: null,
        commercial_register_num: null,
        address: null,
        company_address: '',
        category_ids: [],
      },
      disabled: false,
      prev_work: null,
      phone: null,
      whatsapp: null,
      email: null,
      password: null,
      password_confirmation: null,
      current_password: null,
    }
  },
  mounted() {
    this.form.name = this.item.name
    this.form.address = this.item.address
    this.form.company_name = this.item.company_name
    this.form.company_address = this.item.company_address
    this.form.commercial_register_num = this.item.commercial_register_num
    this.form.tax_card_num = this.item.tax_card_num
    this.phone = this.item.phone
    this.email = this.item.email
    this.whatsapp = this.item.whats
    this.form.category_ids = this.item.categories
    this.prev_work = this.item.previous_work
  },
  methods: {
    async deleteMedia(id, idx, type) {
      if (id != 'new') {
        await this.$axios
          .delete(`/tender/${this.item.id}/medias/${id}`)
          .then((res) => {
            this.TriggerNotify('success', 'تم حذف الملف بنجاح !')
          })
          .catch((err) => {
            const req_error = {
              data: err.response,
              type: 'catch',
            }
            this.error_handler(req_error)
            this.TriggerNotify('error', this.notify.message)
          })
      }
      if (type == 'expiration_images') {
        if (id == 'new') {
          this.form.expiration_images.splice(idx, 1)
        }
        this.expiration_images.splice(idx, 1)
      } else if (type == 'expiration_files') {
        if (id == 'new') {
          this.form.expiration_files.splice(idx, 1)
        }
        this.expiration_files.splice(idx, 1)
      }
    },
    async handleFileUpload($event) {
      this.$nuxt.$loading.start()
      if (this.prev_work != null) {
        await this.$axios
          .delete('/profile/previous-work')
          .then((res) => {
            this.uploadLogic($event)
          })
          .catch((err) => {})
      } else {
        this.uploadLogic($event)
      }
      this.$nuxt.$loading.finish()
    },
    uploadLogic($event) {
      const form_data = new FormData()
      form_data.append('file', $event.target.files[0])
      this.$axios.post('/profile/previous-work', form_data).then((res) => {
        this.TriggerNotify('success', res.data.message)
      })
    },
    async submitForm() {
      await this.$refs.form.validate().then((success) => {
        if (success) {
          this.handleReq()
        }
      })
    },
    async handleReq() {
      this.disabled = true
      const form_data = new FormData()

      form_data.append('_method', 'PUT')
      form_data.append('name', this.form.name)
      form_data.append('address', this.form.address)
      form_data.append('company_address', this.form.company_address)
      form_data.append('company_name', this.form.company_name)
      form_data.append(
        'commercial_register_num',
        this.form.commercial_register_num
      )
      form_data.append('tax_card_num', this.form.tax_card_num)
      if (this.form.category_ids.length > 0) {
        this.form.category_ids.forEach((elem, index) => {
          form_data.append(`categories[${index}]`, elem.id)
        })
      }

      await this.$axios
        .post('/profile/update', form_data)
        .then((res) => {
          this.TriggerNotify('success', 'تم التعديل بنجاح !')
        })
        .catch((err) => {
          const req_error = {
            data: err.response,
            type: 'catch',
          }
          this.error_handler(req_error)
          this.TriggerNotify('error', this.notify.message)
          this.disabled = false
        })
      this.disabled = false
    },
    toggleSelected(selected) {
      const checkCase = this.form.category_ids.find(
        (item) => item.id == selected.id
      )
      if (checkCase) {
        const findIndex = this.form.category_ids.findIndex(
          (item) => item.id == selected.id
        )
        this.form.category_ids.splice(findIndex, 1)
      } else {
        this.form.category_ids.push(selected)
      }
    },
    emitQuery(value) {
      this.$emit('search-query', value)
    },
  },
}
