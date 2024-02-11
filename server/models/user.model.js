const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "El nombre es obligatorio."],
        minLength: [2, "Debe ser mayor a 2 caracter."],
        maxLength: [100, "Debe ser menor a 100 caracteres."]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "El apellido es obligatorio."],
        minLength: [2, "Debe ser mayor a 2 caracter."],
        maxLength: [100, "Debe ser menor a 100 caracteres."]
    },
    email: {
        type: String,
        trim: true, //Elimina los espacios en blanco al inicio y al final
        lowercase: true, //Convierte todo a minuscula antes de enviar el formulario
        unique: true,
        required: [true, "El email es obligatorio."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Por favor, ingrese un email válido."
        }
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria."],
        minLength: [8, "La contraseña debe tener mas de 8 caracteres."],
        validate: {
            validator: (val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{};:'",.<>/?[\]`|~]).{8,}$/.test(val),
            message: "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial"
        }
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transactions"
    }],
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpire: Date

}, { timestamps: true, versionkey: false });
//ESTOS SON MIDDLEWARE: Procesos en medio

// crea un esquema virtual o temporal para hacer la confirmacion de la contrasenia
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);


// ANTES DE VALIDAR verifica si las contrasenia son iguales 
UserSchema.pre('validate', function (next) {
    if (!this.confirmPassword) {
        this.invalidate('confirmPassword', 'Este campo es requerido.');
    } else if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las contraseñas deben coincidir.');
    }
    next();
});
//antes de guardar se ejecuta esto y hashea la contrasenia
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();// hace que se ejecute lo siguiente
        });
});

UserSchema.pre(["findOneAndUpdate"], async function (next) {
    const data = this.getUpdate();
    if (data.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password, salt);
            data.password = hash;
            next();
        } catch (error) {
            next(error);
        }
    }
    next();
});


const User = new mongoose.model("User", UserSchema);

module.exports = User;