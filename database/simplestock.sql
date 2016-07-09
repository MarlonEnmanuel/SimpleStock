-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema simplestock
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema simplestock
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `simplestock` DEFAULT CHARACTER SET utf8 ;
USE `simplestock` ;

-- -----------------------------------------------------
-- Table `simplestock`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `simplestock`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `fechreg` TIMESTAMP NOT NULL DEFAULT now(),
  `estado` TINYINT(1) NOT NULL DEFAULT 1,
  `user` VARCHAR(45) NOT NULL,
  `pass` VARCHAR(45) NOT NULL,
  `nombres` TEXT NULL,
  `apellidos` TEXT NULL,
  `puesto` TEXT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `user_UNIQUE` (`user` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `simplestock`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `simplestock`.`categoria` (
  `idcategoria` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descrip` TEXT NULL,
  `idusuario` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idcategoria`),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `simplestock`.`periodo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `simplestock`.`periodo` (
  `idperiodo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descrip` TEXT NULL,
  `actual` TINYINT(1) NOT NULL DEFAULT 0,
  `fechini` TIMESTAMP NOT NULL,
  `fechfin` TIMESTAMP NULL DEFAULT NULL,
  `idusuario` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idperiodo`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `simplestock`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `simplestock`.`producto` (
  `idproducto` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descrip` TEXT NULL,
  `idusuario` INT NULL,
  `idcategoria` INT NOT NULL,
  PRIMARY KEY (`idproducto`),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC),
  INDEX `fk_producto_categoria1_idx` (`idcategoria` ASC),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC),
  CONSTRAINT `fk_producto_categoria1`
    FOREIGN KEY (`idcategoria`)
    REFERENCES `simplestock`.`categoria` (`idcategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `simplestock`.`inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `simplestock`.`inventario` (
  `idinventario` INT NOT NULL AUTO_INCREMENT,
  `inicial` INT NOT NULL,
  `saldo` INT NOT NULL,
  `idperiodo` INT NOT NULL,
  `idproducto` INT NOT NULL,
  PRIMARY KEY (`idinventario`),
  INDEX `fk_inventario_periodo1_idx` (`idperiodo` ASC),
  INDEX `fk_inventario_producto1_idx` (`idproducto` ASC),
  CONSTRAINT `fk_inventario_periodo1`
    FOREIGN KEY (`idperiodo`)
    REFERENCES `simplestock`.`periodo` (`idperiodo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_inventario_producto1`
    FOREIGN KEY (`idproducto`)
    REFERENCES `simplestock`.`producto` (`idproducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `simplestock`.`movimiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `simplestock`.`movimiento` (
  `idmovimiento` INT NOT NULL AUTO_INCREMENT,
  `fechreg` TIMESTAMP NOT NULL DEFAULT now(),
  `tipo` VARCHAR(45) NOT NULL,
  `cantidad` INT NOT NULL DEFAULT 1,
  `lote` TEXT NULL,
  `guia` TEXT NULL,
  `apunte` TEXT NULL,
  `saldoini` INT NOT NULL,
  `saldofin` INT NOT NULL,
  `idusuario` INT NOT NULL,
  `idinventario` INT NOT NULL,
  PRIMARY KEY (`idmovimiento`),
  INDEX `fk_movimiento_usuario1_idx` (`idusuario` ASC),
  INDEX `fk_movimiento_inventario1_idx` (`idinventario` ASC),
  CONSTRAINT `fk_movimiento_usuario1`
    FOREIGN KEY (`idusuario`)
    REFERENCES `simplestock`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movimiento_inventario1`
    FOREIGN KEY (`idinventario`)
    REFERENCES `simplestock`.`inventario` (`idinventario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE USER 'usersimplestock' IDENTIFIED BY 'aplicacionsimplestock';

GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE `simplestock`.`usuario` TO 'usersimplestock';
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE `simplestock`.`categoria` TO 'usersimplestock';
GRANT INSERT, SELECT, UPDATE ON TABLE `simplestock`.`movimiento` TO 'usersimplestock';
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE `simplestock`.`periodo` TO 'usersimplestock';
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE `simplestock`.`producto` TO 'usersimplestock';
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE `simplestock`.`inventario` TO 'usersimplestock';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `simplestock`.`usuario`
-- -----------------------------------------------------
START TRANSACTION;
USE `simplestock`;
INSERT INTO `simplestock`.`usuario` (`idusuario`, `fechreg`, `estado`, `user`, `pass`, `nombres`, `apellidos`, `puesto`) VALUES (DEFAULT, DEFAULT, 1, 'administrador', 'administrador', 'admin', 'admin', 'admin');

COMMIT;

