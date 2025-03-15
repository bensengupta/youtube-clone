package utils

import (
	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	en_translations "github.com/go-playground/validator/v10/translations/en"
)

type Validate struct {
	validate   *validator.Validate
	translator ut.Translator
}

func NewValidate() *Validate {

	en := en.New()
	uni := ut.New(en, en)

	// this is usually know or extracted from http 'Accept-Language' header
	// also see uni.FindTranslator(...)
	trans, _ := uni.GetTranslator("en")

	validate := validator.New(validator.WithRequiredStructEnabled())
	en_translations.RegisterDefaultTranslations(validate, trans)

	return &Validate{validate: validate, translator: trans}
}

type ValidationErrors []FieldError

type FieldError struct {
	Field   string
	Message string
}

func (self ValidationErrors) ToMap() map[string]string {
	m := make(map[string]string)
	for _, v := range self {
		m[v.Field] = v.Message
	}
	return m

}

func (self *Validate) Struct(s any) ValidationErrors {
	var newFieldErrors ValidationErrors

	err := self.validate.Struct(s)
	if err == nil {
		return newFieldErrors
	}

	fieldErrors := err.(validator.ValidationErrors)

	for _, fieldError := range fieldErrors {
		newFieldError := FieldError{
			Field:   fieldError.Field(),
			Message: fieldError.Translate(self.translator),
		}
		newFieldErrors = append(newFieldErrors, newFieldError)
	}

	return newFieldErrors
}
